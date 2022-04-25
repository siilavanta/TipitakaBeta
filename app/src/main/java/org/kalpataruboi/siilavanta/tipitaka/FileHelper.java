package org.kalpataruboi.siilavanta.tipitaka;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class FileHelper {
    private static final int BUFFER_SIZE = 8192 ;//2048;
    private static final int REQUEST_PERMISSION = 100;
    private static String TAG= FileHelper.class.getName().toString();
    private static String parentPath ="";

    Context context;
    Activity activity;

    public FileHelper(Context context, Activity activity){
        this.context = context;
        this.activity = activity;
    }
    public boolean zip( String sourcePath, String destinationPath, String destinationFileName, Boolean includeParentFolder)  {
        new File(destinationPath ).mkdirs();
        FileOutputStream fileOutputStream ;
        ZipOutputStream zipOutputStream =  null;
        try{
            if (!destinationPath.endsWith("/")) destinationPath+="/";
            String destination = destinationPath + destinationFileName;
            File file = new File(destination);
            if (!file.exists()) file.createNewFile();

            fileOutputStream = new FileOutputStream(file);
            zipOutputStream =  new ZipOutputStream(new BufferedOutputStream(fileOutputStream));

            if (includeParentFolder)
                parentPath=new File(sourcePath).getParent() + "/";
            else
                parentPath=sourcePath;

             //zipFile(zipOutputStream, sourcePath);

        }
        catch (IOException ioe){
            Log.d(TAG,ioe.getMessage());
            return false;
        }finally {
            if(zipOutputStream!=null)
                try {
                    zipOutputStream.close();
                } catch(IOException e) {

                }
        }

        return true;

    }

    private static void zipFile(ZipOutputStream zipOutputStream, String sourcePath) throws  IOException{

            java.io.File files = new java.io.File(sourcePath);
            java.io.File[] fileList = files.listFiles();

            String entryPath="";
            BufferedInputStream input;
            for (java.io.File file : fileList) {
                if (file.isDirectory()) {
                    zipFile(zipOutputStream, file.getPath());
                } else {
                    byte data[] = new byte[BUFFER_SIZE];
                    FileInputStream fileInputStream = new FileInputStream(file.getPath());
                    input = new BufferedInputStream(fileInputStream, BUFFER_SIZE);
                    entryPath=file.getAbsolutePath().replace( parentPath,"");

                    ZipEntry entry = new ZipEntry(entryPath);
                    zipOutputStream.putNextEntry(entry);

                    int count;
                    while ((count = input.read(data, 0, BUFFER_SIZE)) != -1) {
                        zipOutputStream.write(data, 0, count);
                    }
                    input.close();
                }
            }
        }

    public Boolean unzip(String sourceFile, String destinationFolder)  {
        ZipInputStream zis = null;

        try {
            zis = new ZipInputStream(new BufferedInputStream(new FileInputStream(sourceFile)));
            ZipEntry ze;
            int count;
            byte[] buffer = new byte[BUFFER_SIZE];
            while ((ze = zis.getNextEntry()) != null) {
                String fileName = ze.getName();
                fileName = fileName.substring(fileName.indexOf("/") + 1);
                File file = new File(destinationFolder, fileName);
                File dir = ze.isDirectory() ? file : file.getParentFile();

                if (!dir.isDirectory() && !dir.mkdirs())
                    throw new FileNotFoundException("Invalid path: " + dir.getAbsolutePath());
                if (ze.isDirectory()) continue;
                FileOutputStream fout = new FileOutputStream(file);
                try {
                    while ((count = zis.read(buffer)) != -1)
                        fout.write(buffer, 0, count);
                } finally {
                    fout.close();
                }

            }
        } catch (IOException  ioe){
            Log.d(TAG,ioe.getMessage());
            return false;
        }  finally {
            if(zis!=null)
                try {
                    zis.close();
                } catch(IOException e) {

                }
        }
        return true;
    }


    public static void saveToFile( String destinationPath, String data, String fileName){
        try {
            new File(destinationPath).mkdirs();
            File file = new File(destinationPath+ fileName);
            if (!file.exists()) {
                file.createNewFile();
            }
            FileOutputStream fileOutputStream = new FileOutputStream(file,true);
            fileOutputStream.write((data + System.getProperty("line.separator")).getBytes());

        }  catch(FileNotFoundException ex) {
            Log.d(TAG, ex.getMessage());
        }  catch(IOException ex) {
            Log.d(TAG, ex.getMessage());
        }
    }

    public boolean deleteFiles(String parentFolder){
        boolean done = false;
        File dir = new File(parentFolder);
        if (dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                File item =  new File(dir, children[i]);
                item.delete();

                if (i == (children.length -1)){
                    done = true;
                }

            }
            //Toast.makeText( this, "deleted",Toast.LENGTH_LONG ).show();
        }
        return done;
    }

    public boolean deleteFile(String parentFolder, String fileName){
        boolean done = false;
        File dir = new File(parentFolder);
        if (dir.isDirectory()) {
                File file =  new File(dir, fileName);
                file.delete();
            done =  true;
        }
        return  done;
    }
    public boolean createFile(String destinationPath, String fileName, String fileExtention, String text){
        boolean done = false;
        try {


            FileOutputStream fileOutputStream =  context.openFileOutput( fileName + fileExtention, context.MODE_PRIVATE);
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream);
            outputStreamWriter.write(text);
            outputStreamWriter.close();
            done = true;
        } catch (Exception e){
            e.printStackTrace();
        }
        return done;
    }

    public boolean creatFileExternal(String destinationPath, String filename, String text){

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                && ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    REQUEST_PERMISSION);
        }
        boolean done =false;
        FileOutputStream fos;
        try {
            File myFile = new File(destinationPath  + filename);
            myFile.createNewFile();
            FileOutputStream fOut = new FileOutputStream(myFile);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(text);
            myOutWriter.close();
            fOut.close();
           done = true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  done;
    }
    //ref => https://stackoverflow.com/questions/4178168/how-to-programmatically-move-copy-and-delete-files-and-directories-on-sd
    private void moveFile(String inputPath, String inputFile, String outputPath) {

        InputStream in = null;
        OutputStream out = null;
        try {

            //create output directory if it doesn't exist
            File dir = new File (outputPath);
            if (!dir.exists())
            {
                dir.mkdirs();
            }


            in = new FileInputStream(inputPath + inputFile);
            out = new FileOutputStream(outputPath + inputFile);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            in.close();
            in = null;

            // write the output file
            out.flush();
            out.close();
            out = null;

            // delete the original file
            new File(inputPath + inputFile).delete();


        }

        catch (FileNotFoundException fnfe1) {
            Log.e("tag", fnfe1.getMessage());
        }
        catch (Exception e) {
            Log.e("tag", e.getMessage());
        }

    }
    public void copyFile(String inputPath, String inputFile, String outputPath) {

        InputStream in = null;
        OutputStream out = null;
        try {

            //create output directory if it doesn't exist
            File dir = new File (outputPath);
            if (!dir.exists())
            {
                dir.mkdirs();
            }


            in = new FileInputStream(inputPath + inputFile);
            out = new FileOutputStream(outputPath + inputFile);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            in.close();
            in = null;

            // write the output file (You have now copied the file)
            out.flush();
            out.close();
            out = null;

        }  catch (FileNotFoundException fnfe1) {
            Log.e("tag", fnfe1.getMessage());
        }
        catch (Exception e) {
            Log.e("tag", e.getMessage());
        }

    }
}

