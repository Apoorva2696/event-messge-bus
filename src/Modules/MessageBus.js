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
   * @param event
   * @param callback
   * @param context
   * @private
   */
    const _on = function (event, callback, context) {
      // incase the event is not present in the object then, create an empty array
    if (false === _events.hasOwnProperty(event)) {
      _events[event] = [];
        }
        //otherwise add the new subscriber to the list
    _events[event].push({ callback, context });
  };

  /**
   * Removes handler from the subscriber list for a particular event.
   * @param event
   * @param callback
   * @param context
   * @private
   */
  const _off = function (event, callback, context) {
    let eventCount, currentEvent, ctr;
    if (true === _events.hasOwnProperty(event)) {
      currentEvent = _events[event];
      eventCount = currentEvent.length;
      for (ctr = 0; ctr < eventCount; ctr = ctr + 1) {
        if (
          callback === currentEvent[ctr].callback &&
          context === currentEvent[ctr].context
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
        if ("undefined" === typeof currentEvent[ctr].context) {
          if ("function" === typeof currentEvent[ctr].callback) {
            console.log(event, " triggered");
            currentEvent[ctr].callback(payload);
          }
        } else {
          if ("function" === typeof currentEvent[ctr].callback) {
            currentEvent[ctr].callback.call(
              currentEvent[ctr].context,
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
