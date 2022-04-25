package org.kalpataruboi.siilavanta.tipitaka;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;

class LooperThread extends Thread {
    public Handler mHandler;

    public void run() {
        Looper.prepare();

        mHandler = new Handler(Looper.myLooper()) {
            public void handleMessage(Message msg) {
                // process incoming messages here
                Log.d("loop", "handleMessage: "+ msg);
            }
        };

        Looper.loop();
    }
}
