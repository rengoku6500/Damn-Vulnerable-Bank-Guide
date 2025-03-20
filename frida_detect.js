Java.perform(function () {
    console.log("Bypassing Frida detection...");

    try {
        // Hook specific Frida check function
        const FridaCheckJNI = Java.use('com.app.damnvulnerablebank.FridaCheckJNI');
        FridaCheckJNI.fridaCheck.implementation = function() {
            console.log("Bypassing fridaCheck().");
            return 0; // Always return 0 to bypass
        };
    } catch (e) {
        console.log("Failed to hook fridaCheck: " + e.message);
    }

    try {
        // Hook Java System properties used for detection
        const System = Java.use('java.lang.System');
        System.getProperty.overload('java.lang.String').implementation = function(prop) {
            if (prop.includes("ro.debuggable") || prop.includes("ro.secure")) {
                console.log("Bypassing System.getProperty for: " + prop);
                return "0";
            }
            return this.getProperty.call(this, prop);
        };
    } catch (e) {
        console.log("Failed to hook System.getProperty: " + e.message);
    }

    try {
        // Hook anti-Frida native functions
        const Runtime = Java.use('java.lang.Runtime');
        Runtime.exec.overload('java.lang.String').implementation = function(cmd) {
            if (cmd.includes("frida") || cmd.includes("gdb")) {
                console.log("Blocking execution of command: " + cmd);
                return null;
            }
            return this.exec.call(this, cmd);
        };
    } catch (e) {
        console.log("Failed to hook Runtime.exec: " + e.message);
    }

    try {
        // Hook common detection classes
        const Debug = Java.use('android.os.Debug');
        Debug.isDebuggerConnected.implementation = function() {
            console.log("Bypassing Debug.isDebuggerConnected()");
            return false;
        };
        Debug.waitForDebugger.implementation = function() {
            console.log("Bypassing Debug.waitForDebugger()");
        };
    } catch (e) {
        console.log("Failed to hook Debug class: " + e.message);
    }

    console.log("Frida detection bypass applied.");
});