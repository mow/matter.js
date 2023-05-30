/**
 * @license
 * Copyright 2022 The matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { DeviceTypes, DeviceTypeDefinition } from "./DeviceTypes.js";
import { Device } from "./Device.js";
import { createDefaultThermostatClusterServer } from "../cluster/server/ThermostatServer.js";
import { createDefaultGroupsClusterServer } from "../cluster/server/GroupsServer.js";
import { createDefaultScenesClusterServer } from "../cluster/server/ScenesServer.js";
import { createDefaultIdentifyClusterServer } from "../cluster/server/IdentifyServer.js";
import { AttributeInitialValues, ClusterServerHandlers } from "../cluster/server/ClusterServer.js";
import { IdentifyCluster, } from "../cluster/IdentifyCluster.js";
import { ThermostatCluster } from "../cluster/ThermostatCluster.js";
import { extendPublicHandlerMethods } from "../util/NamedHandler.js";
import { BitSchema, TypeFromBitSchema } from "../schema/BitmapSchema.js";
import { Attributes, Cluster, Commands, Events } from "../cluster/Cluster.js";
import { FanControlCluster, createDefaultFanControlClusterServer } from "../cluster/index.js";

type OnOffBaseDeviceCommands = {
    identify: ClusterServerHandlers<typeof IdentifyCluster>["identify"];
}

/**
 * Utility function to get the initial attribute values for a cluster out of an object with initial attribute values
 * for multiple clusters
 *
 * @param attributeInitialValues Object with initial attribute values for automatically added clusters
 * @param cluster Cluster to get the initial attribute values for
 */
function getClusterInitialAttributeValues<F extends BitSchema, SF extends TypeFromBitSchema<F>, A extends Attributes, C extends Commands, E extends Events>(attributeInitialValues: { [key: number]: AttributeInitialValues<any> } | undefined, cluster: Cluster<F, SF, A, C, E>): AttributeInitialValues<A> | undefined {
    if (attributeInitialValues === undefined) return undefined;
    return attributeInitialValues[cluster.id] as AttributeInitialValues<A>;
}

/**
 * Abstract Base class for OnOff devices
 */
abstract class ThermostatBaseDevice extends extendPublicHandlerMethods<typeof Device, OnOffBaseDeviceCommands>(Device) {

    /**
     * Creates a new OnOffBaseDevice
     *
     * @protected
     * @param definition Device type definition of the device to create
     * @param attributeInitialValues Optional object with initial attribute values for automatically added clusters
     * @param endpointId Optional endpoint ID of the device. If not set, the device will be instanced as a root device
     */
    protected constructor(definition: DeviceTypeDefinition, attributeInitialValues?: { [key: number]: AttributeInitialValues<any> }, endpointId?: number) {
        super(definition, endpointId);
        this.addDeviceClusters(attributeInitialValues);
    }

    /**
     * Adds mandatory clusters to the device
     *
     * @protected
     * @param attributeInitialValues Optional object with initial attribute values for automatically added clusters
     */
    protected addDeviceClusters(attributeInitialValues?: { [key: number]: AttributeInitialValues<any> }) {
        // TODO: Find a way to make this automated based on the required clusters?
        this.addClusterServer(createDefaultIdentifyClusterServer({
            identify: async (data) => await this._executeHandler("identify", data)
        }));
        this.addClusterServer(createDefaultGroupsClusterServer());
        this.addClusterServer(createDefaultScenesClusterServer());
        this.addClusterServer(createDefaultThermostatClusterServer(getClusterInitialAttributeValues(attributeInitialValues, ThermostatCluster)));
        this.addClusterServer(createDefaultFanControlClusterServer(getClusterInitialAttributeValues(attributeInitialValues, FanControlCluster)));

        //this.addClusterClient(this.createOptionalClusterClient(RelativeHumidityCluster));
        //this.addClusterClient(this.createOptionalClusterClient(TemperatureMeasurementCluster));
        //this.addClusterClient(this.createOptionalClusterClient(OccupancySensingCluster));
    }

    async setLocalTemperature(temperature: number) {
        this.getClusterServer(ThermostatCluster)?.setLocalTemperatureAttribute(temperature);
    }

    // Add Listeners convenient for chosen attributes
    addOccupiedCoolingSetpointListener(listener: (newValue: number | null, oldValue: number | null) => void) {
        this.getClusterServer(ThermostatCluster)?.subscribeOccupiedCoolingSetpointAttribute(listener);
    }

    addOccupiedHeatingSetpointListener(listener: (newValue: number | null, oldValue: number | null) => void) {
        this.getClusterServer(ThermostatCluster)?.subscribeOccupiedHeatingSetpointAttribute(listener);
    }
}


/**
 * Device class for an ThermostatDevice Device
 */
export class ThermostatDevice extends ThermostatBaseDevice {
    constructor(thermostatAttributeInitialValues?: AttributeInitialValues<typeof ThermostatCluster.attributes>, endpointId?: number) {
        super(DeviceTypes.THERMOSTAT, thermostatAttributeInitialValues, endpointId);
    }
}


/*
Example to enhance the exposed commands of the device

// additional commands to be allowed for registering and triggering handlers
type OnOffLightingDeviceCommands = {
    fadeOut: (time: number) => Promise<void>;
}

class OnOffLightingDevice extends extendPublicHandlerMethods<typeof OnOffBaseDevice, OnOffLightingDeviceCommands>(OnOffBaseDevice) {

    test() {
    7    // This still works
        this._executeHandler("identify", 5);

        // this works too
        this.__internal__DO_NOT_CALL_THIS_OR_YOU_WILL_BE_FIRED__executeHandler("fadeOut", 5);
    }
}
 */
