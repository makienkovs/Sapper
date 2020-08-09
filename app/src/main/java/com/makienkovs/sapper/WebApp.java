package com.makienkovs.sapper;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.webkit.JavascriptInterface;

public class WebApp {
    private Context mContext;
    private boolean sound;
    private boolean vibration;
    private Sound soundFX;
    private Vibration vibrationFX;

    /**
     * Instantiate the interface and set the context
     */
    WebApp(Context c, boolean sound, boolean vibration) {
        mContext = c;
        this.sound = sound;
        this.vibration = vibration;
        initParams();
    }

    void initParams() {
        if (sound)
            soundFX = new Sound(mContext, true);
        else
            soundFX = new Sound(mContext, false);

        if (vibration)
            vibrationFX = new Vibration(mContext, true);
        else
            vibrationFX = new Vibration(mContext, false);
    }

    void release() {
        soundFX.release();
    }

    /**
     * Show a dialog
     */
    @JavascriptInterface
    public void rating(String message) {
        new AlertDialog.Builder(mContext)
                .setMessage(message)
                .setCancelable(false)
                .setTitle(R.string.Info)
                .setIcon(R.drawable.stats)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        vibrateShort();
                        play("tap");
                    }
                })
                .create()
                .show();
    }

    /**
     * Make a vibration on web page
     */
    @JavascriptInterface
    public void vibrateShort() {
        vibrationFX.vibrate(Vibration.VIBRATION_SHORT);
    }

    @JavascriptInterface
    public void vibrateLong() {
        vibrationFX.vibrate(Vibration.VIBRATION_LONG);
    }

    /**
     * Make a sound on web page
     */
    @JavascriptInterface
    public void play(String soundName) {
        soundFX.play(soundName);
    }
}
