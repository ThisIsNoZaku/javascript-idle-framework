import { Engine } from "./Engine";
import { reservedPropertyNames } from "./ValueContainer";
import _ from "lodash";
import {ChangeListener} from "./ChangeListener";
import { Big } from "big.js";

const expectedProperties = [
    "startingValue",
    "updater"
]

export interface PropertyConfiguration {
    startingValue?:any;
    updater?: ((current: any, parent?: any, engine?: Engine) => any);
    listeners?:ChangeListener[];
}

/**
 * The configuration of a
 */
export class PropertyConfigurationBuilder implements PropertyConfiguration{
    startingValue?: any;
    updater?: ((current: any, parent?: any, engine?: Engine) => any);
    listeners?: ChangeListener[];
    public constructor(startingValue?:any, updater?: ((current: any, parent?: any, engine?: Engine) => any)) {
        if(_.isObject(startingValue)) {
            Object.keys(startingValue).forEach(prop => {
                if(reservedPropertyNames.includes(prop)) {
                    throw new Error(`${prop} is a reserved keyword and not allowed as a property.`);
                }
            });
        }
        this.startingValue = startingValue;
        if(updater) { // Makes testing easier by keeping the updater property off the object.
            this.updater = updater;
        }
    }

    public withUpdater(updater: ((current: any, parent?: any, engine?: Engine) => any)) {
        this.updater = updater;
        return this;
    }

    withListener(listener: ChangeListener) {
        if(!this.listeners) {
            this.listeners = [];
        }
        if((this.startingValue instanceof Big) || !_.isObject(this.startingValue) ) {
            throw new Error("Listeners can only added to objects or arrays.");
        }
        this.listeners.push(listener);
        return this;
    }
}