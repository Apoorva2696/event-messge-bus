/* eslint-disable no-prototype-builtins */

import shortid from "shortid";

/**
 * @typedef {object} MessageBus
 * @desc A custom pub-sub application for general use case based on events.
 * @property {function(eventName: string), payload: object} trigger - Trigger an event with payload
 * @property {function(eventName: string), methodToCall, thisBinding} on - Subscribe to an event
 * @property {function(eventName: string), methodToCall, thisBinding} on - Unsubscribe from an event
 * @example
 * import { MessageBus } from 'modules/MessageBus';
 *
 * MessageBus.on( 'SOME_EVENT', this.console.console.logMessages, this );
 * MessageBus.trigger( 'SOME_EVENT', 'SOME_MESSAGE' );
 *
 * // unsubscribe
 * MessageBus.off( 'SOME_EVENT', this.console.console.logMessages, this );
 */

/**
 * @ignore
 */
export const MessageBus = (() => {
  const _events = {}; //To store all events.

  /**
   * Adds handler to the subscriber list for a particular event.
   * @param event
   * @param callback
   * @param callbackObj
   * @private
   */
  const _on = function (event, callback, callbackObj) {
    if (false === _events.hasOwnProperty(event)) {
      _events[event] = [];
    }
    _events[event].push({ callback: callback, callbackObj: callbackObj });
  };

  /**
   * Removes handler from the subscriber list for a particular event.
   * @param event
   * @param callback
   * @param callbackObj
   * @private
   */
  const _off = function (event, callback, callbackObj) {
    let eventCount, currentEvent, ctr;
    if (true === _events.hasOwnProperty(event)) {
      currentEvent = _events[event];
      eventCount = currentEvent.length;
      for (ctr = 0; ctr < eventCount; ctr = ctr + 1) {
        if (
          callback === currentEvent[ctr].callback &&
          callbackObj === currentEvent[ctr].callbackObj
        ) {
          currentEvent.splice(ctr, 1);
          break;
        }
      }
    }
  };

  /**
   * Publishes an event with given payload.
   * @param event
   * @param payload
   * @private
   */
  const _trigger = function (event, payload) {
    let eventCount, currentEvent, ctr;

    if (true === _events.hasOwnProperty(event)) {
      currentEvent = _events[event];
      eventCount = currentEvent.length;
      for (ctr = 0; ctr < eventCount; ctr = ctr + 1) {
        //if the context is not provided
        if ("undefined" === typeof currentEvent[ctr].callbackObj) {
          if ("function" === typeof currentEvent[ctr].callback) {
            console.log(event, " triggered");
            currentEvent[ctr].callback(payload);
          }
        } else {
          if ("function" === typeof currentEvent[ctr].callback) {
            currentEvent[ctr].callback.call(
              currentEvent[ctr].callbackObj,
              payload
            );
          }
        }
      }
    }
  };

  /**
   * Exposes the following methods.
   */
  return {
    on: _on,
    off: _off,
    trigger: _trigger,
  };
})();

/**
 * @desc Get an event emitter which only triggers and listens to one event.
 * @example
 * import { getEmitter } from 'modules/MessageBus';
 *
 * const messageBus = getEmitter();
 *
 * messageBus.trigger();
 * messageBus.on( callback, thisObject );
 * messageBus.off( callback, thisObject );
 *
 * @returns {object} - an instance of MessageBus
 */
export const getEmitter = (eventName = shortid.generate()) => {
  return {
    on: (...params) => {
      return MessageBus.on(eventName, ...params);
    },
    off: (...params) => {
      return MessageBus.off(eventName, ...params);
    },
    trigger: (...params) => {
      return MessageBus.trigger(eventName, ...params);
    },
  };
};
