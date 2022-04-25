package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.content.Context;
import android.content.res.AssetManager;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileCopy {
    public static final String TIPITAKA = "1";
    public static final String Databases = "Databases.db";
    public static final String Databases_db_journal = "Databases.db-journal";


    Activity activity;
    Context context;
    public FileCopy(Context context, Activity activity){
        this.context = context;
        this.activity = activity;
    }

    public Boolean copyFileFromAssets(String fileName, String destinationPath){
        //destination path
        String dirPath = destinationPath;
        File file = new File(dirPath);
        if(!file.exists()){
            file.mkdirs();
        }

        AssetManager assetManager = activity.getAssets();
        InputStream inputStream = null;
        OutputStream outputStream = null;

        try {
            inputStream = assetManager.open(fileName);
            File outputFile = new File(dirPath, fileName);
            outputStream = new FileOutputStream(outputFile);
            copyFile(inputStream,outputStream);
//            Toast.makeText(context,"333333333333",Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(context,"copy file Error!",Toast.LENGTH_LONG).show();
            return false;
        }
        return true;
        // ref => https://stackoverflow.com/questions/51223907/how-can-i-copy-a-file-from-assets-to-internal-storage
    }

    private static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while ((read = in.read(buffer)) != -1) {
            out.write(buffer, 0, read);
        }
        // this part from https://www.youtube.com/watch?v=AUeTkPc4iB4
    }
}
