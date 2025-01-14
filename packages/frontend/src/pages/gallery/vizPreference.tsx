import React from "react";
import { observer } from 'mobx-react-lite';
import { PrimaryButton, Stack, Checkbox, Panel, PanelType, ComboBox, Label } from "office-ui-fabric-react";
import { Aggregator } from "../../global";
import { action } from "mobx";
import { useGlobalStore } from "../../store";
const checkboxStyles = () => {
    return {
        root: {
            marginTop: "10px",
        },
    };
};

// todo: import aggregators list from cube-core
const aggregationList: Array<{ key: Aggregator; text: string }> = [
    { key: "sum", text: "Sum" },
    { key: "count", text: "Count" },
    { key: "mean", text: "Mean" },
];
export interface PreferencePanelConfig {
    aggregator: Aggregator;
    defaultAggregated: boolean;
    defaultStack: boolean;
}

const PreferencePanel: React.FC = () => {
    const { galleryStore } = useGlobalStore()
    const { visualConfig, showConfigPanel } = galleryStore;

    const { aggregator, defaultAggregated, defaultStack } = visualConfig;

    const closeVisualPannel = action(() => {
        galleryStore.showConfigPanel = false;
    })

    const onRenderFooterContent = () => (
        <div>
            <PrimaryButton
                onClick={closeVisualPannel}
            >
                Save
            </PrimaryButton>
        </div>
    );

    return (
        <Panel
            isOpen={showConfigPanel}
            type={PanelType.smallFixedFar}
            onDismiss={closeVisualPannel}
            headerText="Preference"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
        >
            <Label>Preference</Label>
            <Stack verticalFill tokens={{ childrenGap: 50, padding: 6 }}>
                <ComboBox
                    selectedKey={aggregator}
                    label="Aggregator"
                    allowFreeform={true}
                    autoComplete="on"
                    options={aggregationList}
                    onChange={action((e, option) => {
                        if (option) {
                            galleryStore.visualConfig.aggregator = option.key as Aggregator;
                        }
                    })}
                />
                <Checkbox
                    styles={checkboxStyles}
                    label="measurement aggregation"
                    checked={defaultAggregated}
                    onChange={action((e, isChecked) => {
                        galleryStore.visualConfig.defaultAggregated = isChecked || false;
                    })}
                />
                <Checkbox
                    styles={checkboxStyles}
                    label="measurement stack"
                    checked={defaultStack}
                    onChange={action((e, isChecked) => {
                        galleryStore.visualConfig.defaultStack = isChecked || false;
                    })}
                />
            </Stack>
        </Panel>
    );
};

export default observer(PreferencePanel);
