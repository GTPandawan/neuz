import { useRef } from "react";
import { AnyConfig } from "../../models/BotConfig";

export const DefaultValuesChecker = ( config: AnyConfig, defaultValues: any, onChange: (updatedConfig: AnyConfig) => void ) => {
    let default_values_checked = useRef(false)
    if(!default_values_checked.current) {
        let newConfig = {...config}
        for (var key in defaultValues) {
            if(config[key] === null) {
                newConfig[key] = defaultValues[key]
            }
        };
        onChange(newConfig)
        default_values_checked.current = true
    }
}
