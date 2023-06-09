### What is it?
* This sample code demonstrates how to use Apps Script to powerwash and deprovision (unregister) all Chromebooks registered in the Google Admin Console, excluding those whose serial numbers are specified in the COMPANY_OWNED_SERIALS variable.
* To execute this sample code, you need an admin account in the Google Admin Console and admin rights to all the Chromebooks.
This sample code is released under the MIT License, so its use, duplication, modification, and redistribution are free. No copyright notice, which is typically required by the MIT License, is needed.
* As this is under the MIT License, the creator of this sample code does not provide any warranty.
This sample code will powerwash and unregister all Chromebooks registered in the Google Admin Console. Please be careful when executing it. Avoid using it directly in a production environment and ensure thorough testing on your end. This sample code should serve as a reference for testing environments.

### Instructions
1. Download [Code.gs](https://github.com/SoushiYamamoto/Sample-Powerwash-and-Deprovision-AllChromebooks/blob/main/Code.gs) from GitHub.
2. Open Apps Script.
3. Click on [ New Project ], and input a name for your project.
4. Click the [ + ] on the right side of [ Services ], and select [ Admin SDK API ].
5. Click [ Add ].
6. Paste the entire content of Code.gs.
7. Replace the CUSTOMER_ID in the source code, referring to this help article.
8. Add the serial numbers of the devices you don't want to deprovision to COMPANY_OWNED_SERIALS in the source code, stored as an array.
9. Click [ Run ].
10. Check the [ Execution log ] to confirm that the intended devices have been deprovisioned.
11. Set the isTestMode flag in the source code to false.
12. After thorough verification, click [ Run ] at your own risk.
13. The registration of the Chromebooks will be cancelled.
14. Go to Google Admin Console > [ Devices ] > [ Chrome ] > [ Devices ] and set the filter to "deprovisioned".
15. Verify that the relevant devices have been deprovisioned.


### 概要

* このサンプルコードは、Apps Script を使用して、Google 管理コンソールに登録されているすべての Chromebook （COMPANY_OWNED_SERIALS 変数にシリアル番号の記載があるものを除く）を Powerwash して、登録解除（デプロビジョニング）する方法を示しています。
* このサンプルコードを実行するには、Google 管理コンソールの管理者アカウントと、すべての Chromebook の管理者権限が必要です。
* このサンプルコードは、MIT License で公開されておりますので、使用・複製・改変・再配布は自由です。また MIT License では本来必要とされている著作権表示も不要です。
* MIT License でありますので、このサンプルコードの作成者はいかなる保証も行いません。
* Google 管理コンソールに登録されているすべての Chromebook を Powerwash および登録解除しますので、実行には注意が必要です。本番環境でのコピペでのご使用はお控えいただき、ご自身で充分に検証をしてください。本サンプルコードは、検証環境でのサンプルコードとして参考にしてください。

### 手順
1. [Code.gs](https://github.com/SoushiYamamoto/Sample-Powerwash-and-Deprovision-AllChromebooks/blob/main/Code.gs) を GitHub からダウンロードします。
2. Apps Script を開きます。
3. [ 新しいプロジェクト ] をクリックし、プロジェクトの名前を入力します。
4. [ サービス ] の右側の [ + ] をクリックし、[ Admin SDK API ] を選択します。
5. [ 追加 ] をクリックします。
6. Code.gs の内容をすべて貼り付けます。
7. ソースコード内の CUSTOMER_ID を、[こちらのヘルプ記事](https://support.google.com/cloudidentity/answer/10070793?hl=ja)を参考に書き換えます。
8. ソースコード内の COMPANY_OWNED_SERIALS に、プロビジョニング解除を行わない端末のシリアル番号を、配列で格納します。
9. [ 実行 ] をクリックします。
10. [ 実行ログ ] を確認して、想定通りの端末がプロビジョニング解除されていることを確認します。
11. ソースコード内の isTestMode フラグを false に設定します。
12. 充分に確認をした上で、自己責任で [ 実行 ] をクリックします。
13. Chromebook の登録が解除されます。
14. Google 管理コンソール > [ デバイス ] > [ Chrome ] > [ デバイス ] に進み、フィルタを "プロビジョニング解除" に設定します。
15. 該当端末がプロビジョニング解除されていることを確認します。
