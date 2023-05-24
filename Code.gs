/*
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
////////////////////////////////// [ 警告 ] //////////////////////////////////
// 下記のプログラムコードを実行いたしますと、Google 管理コンソールに登録済みの全ての Chromebook の登録解除が行われますので、非常に危険でございます。
// したがって、初期設定ではこのフラグ（isTestMode）は真（True）に設定されており、実際に登録解除が行われることはございません（ログへの出力のみ行われます）。
// なお、CUSTOMER_IDを初期値（"XXXXXXXX"）から変更された場合には、MIT ライセンスへの同意が行われたと認識いたします。
// 本スクリプトの作成者、関係者、および所属する組織は、このスクリプトの実行により生じる可能性のある如何なる損害・被害についても、保証するものではございません。
// その危険性を充分に理解し、自己責任で詳細な検証を行った上で、ご自身の責任のもとで本スクリプトの実行を行っていただくよう、お願い申し上げます。

// 顧客 ID は管理コンソールから確認できます。
// https://support.google.com/cloudidentity/answer/10070793?hl=ja
const CUSTOMER_ID = "XXXXXXXX"; // [ 警告 ] このコードを実行すると、Google 管理コンソールに登録されている全ての Chromebook の登録が解除されるため、大変危険です。CUSTOMER_ID をデフォルト値（"XXXXXXXX"）から変更をした時点で、MIT ライセンスに同意したものとみなします。
const isTestMode = true; 
/////////////////////////////////////////////////////////////////////////////


// 会社が購入したデバイスのシリアル番号を列挙します。こちらにシリアル番号のある端末の登録は解除されません。
// (例) const COMPANY_OWNED_SERIALS = [ "AAAXXX01", "AAAXXX02", "AAAXXX03" ];
const COMPANY_OWNED_SERIALS = [];

// 全ての Chromebook の登録を解除します。ただし、COMPANY_OWNED_SERIALS の配列にシリアル番号が存在する端末の登録は解除しません。
function deprovisionDevice() {
  // AdminDirectory API でデバイスを操作するために必要な、デバイスIDを取得するために、ChromeOS デバイスの一覧を取得します。
  // https://developers.google.com/admin-sdk/directory/reference/rest/v1/chromeosdevices/list?hl=ja
  deprovisioningTargetDeviceIds = {}; // { key = Serial Number, value = Device ID}
  var pageToken;
  let response = AdminDirectory.Chromeosdevices.list(CUSTOMER_ID, { query: "status:provisioned" });

  // AdminDirectory.Chromeosdevice.action() メソッドを呼び出して、COMPANY_OWNED_SERIALS 配列に記載された Chromebook 以外をデプロビジョニング（登録解除）します。
  // https://developers.google.com/admin-sdk/directory/reference/rest/v1/chromeosdevices/action?hl=ja
  response.chromeosdevices.filter(device => !COMPANY_OWNED_SERIALS.includes(device.serialNumber)).forEach(device => {
    Logger.log(`AdminDirectory.Chromeosdevices.action("deprovision", "Serial Number (${device.serialNumber}) は、会社が支給した端末ではありません。この端末の登録を解除します。${isTestMode ? "テストモードのため、実際には操作は実行されません。isTestMode フラグを false に設定して、再度実行すると、すべての Chromebook の登録が解除されます。": ""}", ${device.deviceId});`);
    if (!isTestMode) AdminDirectory.Chromeosdevices.action({ "action": "deprovision", "deprovisionReason": "different_model_replacement" }, CUSTOMER_ID, device.deviceId);
  });

  // 次のページを読み込みます。
  pageToken = response.nextPageToken;
  if (!pageToken) {
    response = undefined;
  } else {
    response = AdminDirectory.Chromeosdevices.list(CUSTOMER_ID, { query: "status:provisioned" });
  }
}
