package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.StatFs;
import android.provider.Settings;
import android.util.Log;
import android.view.Display;
import android.view.inputmethod.InputMethodManager;
import android.view.inputmethod.InputMethodSubtype;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import java.io.File;
import java.util.Formatter;
import java.util.Locale;


public class DeviceInfo {
    private static final String TAG = "myTag";
    Context context;
    Activity activity;

    public String avRam;
    public String totRam;
    public Boolean lowRam;


    public DeviceInfo(Context context, Activity activity){
        this.context = context;
        this.activity = activity;
        getRamInfo();
    }
    public String getUid(){
        String uid = Settings.System.getString(activity.getContentResolver(), Settings.Secure.ANDROID_ID);
       // Toast.makeText(context, uid, Toast.LENGTH_LONG).show();
        return  uid;
    }
    public String getModelName(){

        String model = Build.MODEL;
        String deviceName = Build.MANUFACTURER;
        //Log.d(TAG, "getDeviceName: " + deviceName);
        return  model;

    }

    public void getUser(){
        String user = Build.HARDWARE;

        Log.d(TAG, "DISPLAY: "+user );
    }

    public static final int getAndroidVersion(){
        int v = Build.VERSION.SDK_INT;
        return v;
    }

    private String floatForm(double d) {
        return String.format(java.util.Locale.US, "%.2f", d);
    }

    public String bytesToHuman(long size) {
        long Kb = 1024;
        long Mb = Kb * 1024;
        long Gb = Mb * 1024;
        long Tb = Gb * 1024;
        long Pb = Tb * 1024;
        long Eb = Pb * 1024;

        if (size < Kb) return floatForm(size) + " byte";
        if (size >= Kb && size < Mb) return floatForm((double) size / Kb) + " KB";
        if (size >= Mb && size < Gb) return floatForm((double) size / Mb) + " MB";
        if (size >= Gb && size < Tb) return floatForm((double) size / Gb) + " GB";
        if (size >= Tb && size < Pb) return floatForm((double) size / Tb) + " TB";
        if (size >= Pb && size < Eb) return floatForm((double) size / Pb) + " Pb";
        if (size >= Eb) return floatForm((double) size / Eb) + " Eb";

        return "0";
    }

    private void getRamInfo(){
        ActivityManager actManager = (ActivityManager) activity.getSystemService(activity.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        actManager.getMemoryInfo(memInfo);
        totRam = bytesToHuman(memInfo.totalMem);
        avRam = bytesToHuman(memInfo.availMem);
        lowRam = memInfo.lowMemory;

        //ref => https://www.tabnine.com/code/java/methods/android.app.ActivityManager/getMemoryInfo
    }

    public int appVersionCode(){
        PackageInfo packageInfo = new PackageInfo();
        int appVersion;
        appVersion = BuildConfig.VERSION_CODE;
        Log.d(TAG, "appVersionCode: "+ BuildConfig.VERSION_CODE);
        return appVersion;
    }
    public String appVersionName(){
        PackageInfo packageInfo = new PackageInfo();
        String versionName;
        versionName = packageInfo.versionName;
        Log.d(TAG, "appVersionName: "+ BuildConfig.VERSION_NAME);
        return BuildConfig.VERSION_NAME;
    }
    public String getKeyLang(){
        String keyLang = null;
        InputMethodManager inputMethodManager = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
        InputMethodSubtype inputMethodSubtype = inputMethodManager.getCurrentInputMethodSubtype();
        keyLang = inputMethodSubtype.getLocale();
        Log.d(TAG, "getKeyLang: " + keyLang);
        return keyLang;
    }
    public String getLocalLangage(){
        String localLang = null;
        localLang = Locale.getDefault().getLanguage();
        Log.d(TAG, "getLocalLangage: " + localLang);
        return localLang;
    }

    @RequiresApi(api = Build.VERSION_CODES.R)
    public int getFreeSpace(){
        int freeSapce ;
        File path = Environment.getExternalStorageDirectory();
        //Log.d(TAG, "getFreeSpace: " + path.toString());
        StatFs statFs = new StatFs(path.getPath());
        long blockSize = statFs.getAvailableBlocksLong();
        long freeSize = statFs.getBlockSizeLong();
        freeSapce = (int) (((blockSize * freeSize) /1024) /1024);
        //Log.d(TAG, "getFreeSpace: " + ((blockSize * freeSize) /1024) /1024);
        return freeSapce;
    }

    public int getDisplayHeight(){
        Display display = activity.getWindowManager().getDefaultDisplay();
        int displayHeight = display.getHeight();
        Log.d(TAG, "display height : " + displayHeight);
        return displayHeight;
    }
    public int getDisplayWidth(){
        Display display = activity.getWindowManager().getDefaultDisplay();
        int displayWidth = display.getWidth();
        Log.d(TAG, "display width : " + displayWidth);
        return displayWidth;
    }
}
