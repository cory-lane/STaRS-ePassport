/**
 * Copyright (c) 2013 Monday Consulting GmbH
 * Copyright (c) 2015 Tasso Evangelista
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package me.tassoevan.cordova;

import android.content.Intent;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

public class GoHomePlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if ("goHome".equals(action)) {
            return this.doGoHomeAction(args, callbackContext);
        } else {
            this.logError("Called invalid action: " + action);
            return false;
        }
    }

    private boolean doGoHomeAction(JSONArray args, CallbackContext callbackContext) {
        try {
            Intent i = new Intent(Intent.ACTION_MAIN);
            i.addCategory(Intent.CATEGORY_HOME);
            this.cordova.getActivity().startActivity(i);
            callbackContext.success();
            return true;
        } catch (Exception e) {
            this.logError("Exception occurred: ".concat(e.getMessage()));
            callbackContext.error("Exception occurred: ".concat(e.getMessage()));
            return false;
        }
    }

    private void logError(String description) {
        Log.e(GoHomePlugin.class.getName(), description);
    }
}
