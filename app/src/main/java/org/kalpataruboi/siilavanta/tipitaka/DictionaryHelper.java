package org.kalpataruboi.siilavanta.tipitaka;



import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import org.json.JSONArray;

import java.util.ArrayList;

public class DictionaryHelper extends SQLiteOpenHelper {

    public final static String DATABASE_NAME = "dictionary.db";

    public static final String COLM_1 = "id";
    public static final String COLM_2 = "gram";
    public static final String COLM_3 = "word";
    public static final String COLM_4 = "mean";
    public static final String COLM_5 = "his";
    public static final String COLM_6 = "fav";
    private static DictionaryHelper mInstance;
    private static final String TAG = DatabaseHelper.class.getName().toString();

    private DictionaryHelper(@Nullable Context context){
        super(context, DATABASE_NAME, null, 1);
    }
    public static synchronized DictionaryHelper getInstance(Context context) {

        if (mInstance == null){
            mInstance = new DictionaryHelper(context.getApplicationContext());
        }
       return mInstance;
    }

    /**
     * instance method implement from stackoverflow answer
     * ref = > https://stackoverflow.com/questions/18147354/sqlite-connection-leaked-although-everything-closed
     * @param db
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        // db.execSQL("CREATE TABLE IF NOT EXISTS "+TABLE_NAME+"(id INTEGER PRIMARY KEY AUTOINCREMENT,_word TEXT,_gram TEXT,_meaning TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
//        db.execSQL("DROP TABLE IF EXISTS "+TABLE_NAME);
//        onCreate(db);
    }

    /**
     * @param webView
     * @param context
     * @param tableName
     * @param query
     */
    public static void getPopUpWordMeaning(WebView webView, Context context, String tableName, String query){
        SQLiteDatabase db = DictionaryHelper.getInstance(context).getReadableDatabase();
        String statement = "SELECT * FROM " + tableName+" WHERE word like '"+query+"%'";
        Cursor cursor = db.rawQuery(statement, null);

        ArrayList<String> list = new ArrayList<String>();
        if (cursor.getCount() != 0){
            while (cursor.moveToNext() && (cursor.getPosition() < 6)){
                //Log.d(TAG, "getPopUpWordMeaning: " + tableName + ": " + cursor.getString(1) + cursor.getPosition());
             //   Toast.makeText(context, tableName + txt, Toast.LENGTH_SHORT).show();

                // 1 position = word, 3 position = meaning
                list.add(cursor.getString(1) + "||" + cursor.getString(3));



            }
            webView.post(new Runnable() {
                @Override
                public void run() {
                    JSONArray jsArray = new JSONArray(list);
                   // Log.d(TAG, "arr "+ tableName + "=>" + jsArray.toString());
                    webView.evaluateJavascript("setDicView('" + tableName + "'," + jsArray+ ", '" +query+"')", null);
                }
            });
            cursor.close();
            db.close();
        }else {
           // Log.d(TAG, "getPopUpWordMeaning: not found" );
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.evaluateJavascript("setDicView('" + tableName + "', [" + "], '" +query+ "')", null);
                }
            });
        }

    }

    public static void getDictionary(WebView webView, Context context, String tableName,
                                     String listHoder,  String query, String functionName){

        SQLiteDatabase db = DictionaryHelper.getInstance(context).getReadableDatabase();
        String statement = "SELECT * FROM " + tableName+" WHERE word like '"+query+"%'";
        Cursor cursor = db.rawQuery(statement, null);

        ArrayList<String> list = new ArrayList<String>();
        if (cursor.getCount() != 0){
            while (cursor.moveToNext() && (cursor.getPosition() < 6)){
                //Log.d(TAG, "getPopUpWordMeaning: " + tableName + ": " + cursor.getString(1) + cursor.getPosition());
                //   Toast.makeText(context, tableName + txt, Toast.LENGTH_SHORT).show();

                // 1 position = word, 3 position = meaning
                list.add(cursor.getString(1) + "||" + cursor.getString(3));
            }
            webView.post(new Runnable() {
                @Override
                public void run() {
                    JSONArray jsArray = new JSONArray(list);
                    webView.evaluateJavascript("setMainDicView('" + tableName + "','" + listHoder + "', " + jsArray+ ", '" +functionName+"')", null);
                }
            });
            cursor.close();
            db.close();
        }else {
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.evaluateJavascript("setMainDicView('" + tableName + "','" + listHoder + "', [" + "], '" +functionName+"')", null);

                }
            });
        }

    }

}
