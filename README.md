# Upgrade / Downgrade Firmware with parameters


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files

```
git clone git@github.com:a2softin-LTD/tools_sas_firmware_tests.git
```
- [ ] Open the project in a IDE and run the command for installing all dependencies:
```
npm install
```

- [ ] Run the test from command line:
####
- Windows:

```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:FIRMWARE_VERSIONS="http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin"; npx playwright test --grep "@tabachkov"
```
- Linux:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" DEVICE_ID="${DEVICE_ID_HEX}" FIRMWARE_VERSIONS="http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin" npx playwright test --grep "@tabachkov"
```

where:
- ENV: string = {**"dev"** **by default**, "qa", "prod"}
- USER_EMAIL: string = {YOUR_EMAIL || **"pinchuk.dap@gmail.com" by default**}
- USER_PASSWORD_MD5: string = {YOUR_PASSWORD_MD5 || **"5a2ddac0aeb60f6cd8c96ef2d3f6c394" by default**}
- DEVICE_ID_HEX: string = {YOUR_DEVICE_ID_HEX || **"00:08:B7:10:08:F4" by default**}
- FIRMWARE_VERSIONS: string = {YOUR_FIRMWARE_VERSIONS_AS_STRING || "http:\/\/dev-file.maks.systems:7070/v2/files/b7/22_74.bin,http:\/\/dev-file.maks.systems:7070/v2/files/b7/22_73.bin,http:\/\/dev-file.maks.systems:7070/v2/files/b7/22_72.bin,http:\/\/dev-file.maks.systems:7070/v2/files/b7/22_71.bin,http:\/\/dev-file.maks.systems:7070/v2/files/b7/22_75.bin" by default}
- command fot launch the test: npx playwright test --grep "@tabachkov", where the tag "@tabachkov" always used!
