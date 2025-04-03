# Upgrade / Downgrade Firmware with parameters


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

- [ ] Check `node.js` version (the version must be at least 18):

```
node -v
```
if your version does not meet the above requirements, please install/update it using [Node.js](https://nodejs.org/)

- [ ] Use one from following utilities for running tests: [Microsoft Powershell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5#installing-the-msi-package), Command Line (cmd), [Git Bush](https://git-scm.com/)

- [ ] Install [Microsoft VS Code](https://code.visualstudio.com/download)

- [ ] Check or install [TypeScript](https://www.typescriptlang.org/download/)

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files:
```
git clone git@github.com:a2softin-LTD/tools_sas_firmware_tests.git
```

- [ ] Open the project in an IDE and run the command for installing all dependencies:
```
npm install
```

- [ ] Please install additionally [Playwright framework](https://playwright.dev/docs/intro)
```
npm init playwright@latest
```
Run install command and select the following to get started:
- Choose between TypeScript or JavaScript (default is TypeScript)
- Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
- Add a GitHub Actions workflow to easily run tests on CI
- Install Playwright browsers (default is true)

- [ ] (!) Use [MD5 generator](https://www.md5hashgenerator.com/) to convert password from `String` to `Hash`

# I. Upgrade / Downgrade Firmware tests

### 1. `Upgrade/Downgrade Firmware` tests for `single device` - running from command line:
####
- Windows, eg:
```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:PASSWORD="${PASSWORD}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:FIRMWARE_VERSIONS="${VERSION_1},${VERSION_2},...${VERSION_N}"; npx playwright test --grep "@sas_upgrade_downgrade"
```
- Linux, eg:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" PASSWORD="${PASSWORD}" DEVICE_ID="${DEVICE_ID_HEX}" FIRMWARE_VERSIONS="${VERSION_1},${VERSION_2},...${VERSION_N}" npx playwright test --grep "@sas_upgrade_downgrade"
```
use follow tag: `@sas_upgrade_downgrade`

See examples below (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="agntkcak7s@jxpomup.com"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:10:08:F4"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@sas_upgrade_downgrade"
$env:TEST_ENV="dev"; $env:EMAIL="agntkcak7s@jxpomup.com"; $env:PASSWORD="asdASD123"; $env:DEVICE_ID="00:08:B7:10:08:F4"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@sas_upgrade_downgrade"
````
#### Important to know!
1. The versions will be installed in the order they are specified in the line: `VERSION_1 -> VERSION_2 -> ... -> VERSION_N`

2. If you try to install a previously installed version - the test will fail (this behavior will be fixed as an Improvement some later)


## 2. `Upgrade/Downgrade Firmware` tests for `several devices` - running from command line:
####
- ***URGENT! All devices must belong to ONE OWNER!***
- Windows, eg:
```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:PASSWORD="${USER_PASSWORD}"; $env:SEVERAL_DEVICES_SAS="${SEVERAL_DEVICES_SAS}"; $env:FIRMWARE_VERSIONS="${VERSION_1},${VERSION_2},...${VERSION_N}"; npx playwright test --grep "@several_devices_up_down"
```
- Linux, eg:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" PASSWORD="${USER_PASSWORD}" DEVICE_ID="${SEVERAL_DEVICES_SAS}" FIRMWARE_VERSIONS="${VERSION_1},${VERSION_2},...${VERSION_N}" npx playwright test --grep "@several_devices_up_down"
```
use follow tag: `@several_devices_up_down`

See examples below (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="slobandriana+1@gmail.com"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:SEVERAL_DEVICES_SAS="00:08:B7:00:00:08,00:08:B7:10:02:08"; $env:FIRMWARE_VERSIONS="http://95.67.118.186:29034/fw/xx_76_01/mpx_ua_dev.ebin,http://95.67.118.186:29034/fw/xx_76_02/mpx_ua_dev.ebin"; npx playwright test --grep "@several_devices_up_down"
$env:TEST_ENV="dev"; $env:EMAIL="slobandriana+1@gmail.com"; $env:PASSWORD="asdASD123"; $env:SEVERAL_DEVICES_SAS="00:08:B7:00:00:08,00:08:B7:10:02:08"; $env:FIRMWARE_VERSIONS="http://95.67.118.186:29034/fw/xx_76_01/mpx_ua_dev.ebin,http://95.67.118.186:29034/fw/xx_76_02/mpx_ua_dev.ebin"; npx playwright test --grep "@several_devices_up_down"
````


## 3. `Add / Delete reactions` - running  tests from command line:
####
- Windows:
```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:PASSWORD="${USER_PASSWORD}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:REACTION_AMOUNT="${REACTION_AMOUNT}"; npx playwright test --grep "@sas_reactions_add | @sas_reactions_delete"
```
- Linux:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" PASSWORD="${USER_PASSWORD}" DEVICE_ID="${DEVICE_ID_HEX}"; $env:REACTION_AMOUNT="${REACTION_AMOUNT}" npx playwright test --grep "@sas_reactions_add | @sas_reactions_delete"
```
use following tags: `@sas_reactions_add` or `@sas_reactions_delete`

See examples below (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_add" 
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD="asdASD123"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_add" 

$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_delete"
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD="asdASD123"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_delete"
````


## 4. `Add / Delete users` tests - running from command line:
####
- Windows:
```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:PASSWORD="${USER_PASSWORD}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:USER_AMOUNT="${USER_AMOUNT}"; npx playwright test --grep "@sas_users_add | @sas_users_delete"
```
- Linux:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" PASSWORD="${USER_PASSWORD}" DEVICE_ID="${DEVICE_ID_HEX}"; $env:USER_AMOUNT="${USER_AMOUNT}" npx playwright test --grep "@sas_users_add | @sas_users_delete"
```
use following tags: `@sas_users_add` or `@sas_users_delete`


### See examples below (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:USER_AMOUNT="10"; npx playwright test --grep "@sas_users_add" 
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD="asdASD123"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:USER_AMOUNT="10"; npx playwright test --grep "@sas_users_add" 

$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:USER_AMOUNT="10"; npx playwright test --grep "@sas_users_delete"
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD="asdASD123"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:USER_AMOUNT="10"; npx playwright test --grep "@sas_users_delete"
````

## 5. `Upgrade/downgrade Firmware in parallel for all specified devices`
####
Steps to run tests:
1. Use and update test data file in the project: ``resources/test_data.json``:
   1. the file contains an array of user test data in the form of separate Objects, eg:
      ````
        [
          {
          "user": {
          "email": "slobandriana+1@gmail.com",
          "password": "asdASD123",
          "passwordEncryptMD5": "8af3982673455323883c06fa59d2872a"
          },
          "versions": [
              "http://95.67.118.186:29034/fw/xx_77_03/mpx_ua_dev.ebin",
              "http://95.67.118.186:29034/fw/xx_78_01/mpx_ua_dev.ebin"
          ],
          "deviceIdsHex": [
              "00:08:B7:10:02:08",
              "00:08:B7:00:00:08"
          ],
          "cycle": 1,
          "retries": 1
          },
      {
          "user": {
          "email": "agntkcak7s@jxpomup.com",
          "password": "asdASD123",
          "passwordEncryptMD5": "8af3982673455323883c06fa59d2872a"
          },
          "versions": [
              "http://95.67.118.186:29034/fw/xx_77_03/mpx_ua_dev.ebin",
              "http://95.67.118.186:29034/fw/xx_78_01/mpx_ua_dev.ebin"
          ],
          "deviceIdsHex": [
            "00:08:B7:10:08:F4"
          ],
          "cycle": 1,
          "retries": 1
          }
      ]
   2. update the file with your details
   3. save the file
2. Run the command in the console: ```node upgrade-firmware-tests-generator.js```
3. In the project folder ```specs/global/autogenerated/upgrade-firmware``` you will see automatically generated test files. Note that each file contains a test for only ```one``` device with the corresponding user data. For example, if you have 2 users specified in the json file, and the first has 2 devices, and the second has 3 devices, as a result, 5 test files will be generated
4. Count the number of files generated (this is necessary to run tests with the appropriate number of workers)
5. Run the command in the console: ```npx playwright test --grep "@sas_upgrade_async_single_user_multiple_devices_json" --workers {WORKER_NUMBER}```


- Example:
```
npx playwright test --grep "@sas_upgrade_async_single_user_multiple_devices_json" --workers 3
```
- #### Important! Use following tags: `@sas_upgrade_async_single_user_multiple_devices_json`
- #### Important! Use the number of `workers` equal to the `number of generated test files`


#### The values of the environment variables are described below:
- ENV: string = {**"dev"** **by default**, "qa", "prod"}
- USER_EMAIL: string = {YOUR_EMAIL || **"slobandriana+1@gmail.com" by default**}
- USER_PASSWORD_MD5: string = {YOUR_PASSWORD_MD5 || **"8af3982673455323883c06fa59d2872a" by default**}
- PASSWORD (instead MD5): string = {YOUR_PASSWORD || **"asdASD123" by default**}
- DEVICE_ID_HEX: string = {YOUR_DEVICE_ID_HEX || **"00:08:B7:10:08:F4" by default**}
- FIRMWARE_VERSIONS: string = {YOUR_FIRMWARE_VERSIONS_AS_STRING || **"http:\/\/51.20.115.159:7070/firmware/b7/22_74.bin,http:\/\/51.20.115.159:7070/firmware/b7/22_75.bin" by default**}
- REACTION_AMOUNT: string = {REACTION_AMOUNT || **"10" by default**}

#### Commands for running certain tests:
- command to run all test: `npx playwright test` 
- command to run tests for upgrade firmware for selected devices:`npx playwright test --grep "@upgrade"`, where the tag "@upgrade" always used!
- command to run tests for downgrade firmware for selected devices:`npx playwright test --grep "@downgrade"`, where the tag "@downgrade" always used!
- command to run tests for upgrade/downgrade firmware for several selected devices:`npx playwright test --grep "@several_devices_up_down"`, where the tag "@several_devices_up_down" always used!
- command to run tests for upgrade/downgrade random versions (e.g. 22_75 -> 22_73 -> 22_76 -> 22_71 -> ...) of firmware for selected devices:`npx playwright test --grep "@sas_upgrade_downgrade"`, where the tag "@sas_upgrade_downgrade" always used!
- command to run tests to add the specified number of Reactions for selected devices:`npx playwright test --grep "@sas_reactions_add"`, where the tag "@sas_reactions_add" always used!
- command to run tests to delete all Reactions for selected devices:`npx playwright test --grep "@sas_reactions_delete"`, where the tag "@sas_reactions_delete" always used!
- command to run tests to add the specified number of Users for selected devices:`npx playwright test --grep "@sas_users_add"`, where the tag "@sas_users_add" always used!
- command to run tests to delete all Users for selected devices:`npx playwright test --grep "@sas_users_delete"`, where the tag "@sas_users_delete" always used!

# III. Checking the behavior of the Discovery Server tests - running from command line:

####
- Windows / Linux:
```
npx playwright test --grep "@discovery-server"
```

use following tags: `@discovery-server`