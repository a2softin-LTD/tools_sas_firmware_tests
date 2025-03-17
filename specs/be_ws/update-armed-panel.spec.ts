import { armedTestGenerator } from "../../src/generators/armed-test.generator";
import { Environments } from "../../src/domain/constants/environments";
import { environmentConfig } from "../../ws/EnvironmentConfig";
import { PanelUpdateFirmwareConfiguration } from "../../src/domain/constants/update-firmware.configuration";
import { getAllVersionConfigsB7 } from "../../ws/FirmwareVersionConfig";
import { TestDataProvider } from "../../utils/TestDataProvider";


// armedTestGenerator(
//     new PanelUpdateFirmwareConfiguration(
//         TestDataProvider.DeviceIdWithEthernet,
//         getAllVersionConfigsB7(),
//         'Ethernet'
//     ),
//     environmentConfig.get(Environments.DEV)
// )


armedTestGenerator(
    new PanelUpdateFirmwareConfiguration(
        TestDataProvider.DeviceIdWithGSM,
        // getAllVersionConfigsB7(),
        'GSM'
    ),
    environmentConfig.get(Environments.DEV)
)

// armedTestGenerator(
//     new PanelUpdateFirmwareConfiguration(
//         TestDataProvider.DeviceIdWithWiFi,
//         getAllVersionConfigsB7(),
//         'Ethernet'
//     ),
//     environmentConfig.get(Environments.DEV)
// )
