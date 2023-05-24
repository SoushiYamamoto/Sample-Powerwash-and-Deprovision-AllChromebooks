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
// このサンプルコードを実行すると、Google 管理コンソールに登録済みの全ての Chromebook の Powerwash および登録解除が行われます。
// したがって、初期設定では安全のため、テストフラグ（isTestMode）が真（True）に設定されており、実際に Powerwash や登録解除が行われることはございません（ログへの出力のみ行われます）。
// なお、CUSTOMER_ID を初期値（"XXXXXXXX"）から変更された場合には、MIT ライセンスへの同意が行われたと認識いたします。
// このサンプルコードの作成者、関係者、および所属する組織は、このサンプルコードの実行により生じる可能性のある如何なる損害・被害についても、保証いたしません。
// Google 管理コンソールに登録されているすべての Chromebook を Powerwash および登録解除しますので、実行には注意が必要です。本番環境でのコピペでのご使用はお控えいただき、ご自身で充分に検証をしてください。本サンプルコードは、検証環境でのサンプルコードとして参考にしてください。

// 顧客 ID は管理コンソールから確認できます。
// https://support.google.com/cloudidentity/answer/10070793?hl=ja
const CUSTOMER_ID = "XXXXXXXX"; // [ 警告 ] このコードを実行すると、Google 管理コンソールに登録されている全ての Chromebook で Powerwash かつデバイスの登録が解除されるため、注意が必要です。CUSTOMER_ID をデフォルト値（"XXXXXXXX"）から変更をした時点で、MIT ライセンスに同意したものとみなします。
const isTestMode = true; 
/////////////////////////////////////////////////////////////////////////////


// 会社が購入したデバイスのシリアル番号を列挙します。こちらにシリアル番号のある端末の登録は解除されません。
// (例) const COMPANY_OWNED_SERIALS = [ "AAAXXX01", "AAAXXX02", "AAAXXX03" ];
const COMPANY_OWNED_SERIALS = [];

// 全ての Chromebook を Powerwash して、かつ、登録を解除します。ただし、COMPANY_OWNED_SERIALS の配列にシリアル番号が存在する端末の登録は解除しません。
function deprovisionDevice() {
  // AdminDirectory API でデバイスを操作するために必要な、デバイスIDを取得するために、ChromeOS デバイスの一覧を取得します。
  // https://developers.google.com/admin-sdk/directory/reference/rest/v1/chromeosdevices/list?hl=ja
  deprovisioningTargetDeviceIds = {}; // { key = Serial Number, value = Device ID}
  var pageToken;
  let response = AdminDirectory.Chromeosdevices.list(CUSTOMER_ID, { query: "status:provisioned" });

  // AdminDirectory.Chromeosdevice.action() メソッドを呼び出して、COMPANY_OWNED_SERIALS 配列に記載された Chromebook 以外をデプロビジョニング（登録解除）します。
  // https://developers.google.com/admin-sdk/directory/reference/rest/v1/chromeosdevices/action?hl=ja
  response.chromeosdevices.filter(device => !COMPANY_OWNED_SERIALS.includes(device.serialNumber)).forEach(device => {
    Logger.log(`Serial Number (${device.serialNumber}) は、会社が支給した端末ではありません。この端末を Powerwash して、端末の登録を解除します。${isTestMode ? "テストモードのため、実際には操作は実行されません。isTestMode フラグを false に設定して、再度実行すると、すべての Chromebook の登録が解除されます。" : ""}`);
    if (!isTestMode) {
      AdminDirectory.Customer.Devices.Chromeos.issueCommand({ "commandType": "REMOTE_POWERWASH", }, CUSTOMER_ID, device.deviceId);
      AdminDirectory.Chromeosdevices.action({ "action": "deprovision", "deprovisionReason": "different_model_replacement" }, CUSTOMER_ID, device.deviceId);
    }
  });

  // 次のページを読み込みます。
  pageToken = response.nextPageToken;
  if (!pageToken) {
    response = undefined;
  } else {
    response = AdminDirectory.Chromeosdevices.list(CUSTOMER_ID, { query: "status:provisioned" });
  }
}
