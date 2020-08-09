package com.makienkovs.sapper;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.RatingBar;
import android.widget.Switch;

public class MainActivity extends AppCompatActivity {

    private static boolean sound = true;
    private static boolean vibration = true;
    private int difficulty = 0;
    public final String APP_PREFERENCES = "settings";
    public final String APP_PREFERENCES_SOUND = "sound";
    public final String APP_PREFERENCES_VIBRATION = "vibration";
    public final String APP_PREFERENCES_DIFFICULTY = "difficulty";
    private SharedPreferences settings;
    private SharedPreferences.Editor editor;
    Sound soundButtons;
    Vibration vibrationButtons;

    @SuppressLint({"SourceLockedOrientationActivity", "CommitPrefEdits"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        settings = getSharedPreferences(APP_PREFERENCES, Context.MODE_PRIVATE);
        editor = settings.edit();
        soundButtons = new Sound(this, true);
        vibrationButtons = new Vibration(this, true);
        readParams();
    }

    @Override
    protected void onStop() {
        super.onStop();
        writeParams();
        soundButtons.release();
    }

    @Override
    protected void onResume() {
        super.onResume();
        readParams();
        soundButtons = new Sound(this, true);
    }

    private void readParams() {
        if (settings.contains(APP_PREFERENCES_SOUND)) {
            sound = settings.getBoolean(APP_PREFERENCES_SOUND, true);
        }
        if (settings.contains(APP_PREFERENCES_VIBRATION)) {
            vibration = settings.getBoolean(APP_PREFERENCES_VIBRATION, true);
        }
        if (settings.contains(APP_PREFERENCES_DIFFICULTY)) {
            difficulty = settings.getInt(APP_PREFERENCES_DIFFICULTY, 0);
        }
    }

    private void writeParams() {
        editor.putBoolean(APP_PREFERENCES_SOUND, sound);
        editor.putBoolean(APP_PREFERENCES_VIBRATION, vibration);
        editor.putInt(APP_PREFERENCES_DIFFICULTY, difficulty);
        editor.apply();
    }

    public void changeActivity(View v) {
        final Animation animScale = AnimationUtils.loadAnimation(this, R.anim.scale);
        v.startAnimation(animScale);
        fx();

        Button button = findViewById(R.id.start);

        int lang = 0;
        String buttonText = button.getText().toString();
        if (buttonText.equals("Начать игру"))
            lang = 1;

        Intent web = new Intent(MainActivity.this, WebActivity.class);
        web.putExtra("URL", "file:///android_asset/www/index.html#" + difficulty + lang);
        startActivity(web);
    }

    public void setSound() {
        sound = !sound;
        if (sound)
            soundButtons.play("message");
        else
            soundButtons.play("tap");
    }

    public static boolean getSound(){
        return sound;
    }

    public static boolean getVibration(){
        return vibration;
    }

    public void setVibration() {
        vibration = !vibration;
        if (vibration)
            vibrationButtons.vibrate(Vibration.VIBRATION_LONG);
        else
            vibrationButtons.vibrate(Vibration.VIBRATION_SHORT);
    }

    private void fx() {
        if (sound)
            soundButtons.play("tap");
        if (vibration)
            vibrationButtons.vibrate(Vibration.VIBRATION_SHORT);
    }

    public void settings(View v) {
        final Animation animScale = AnimationUtils.loadAnimation(this, R.anim.scale);
        v.startAnimation(animScale);
        fx();

        final View settingsLayout = getLayoutInflater().inflate(R.layout.settings, null);
        final RatingBar ratingBar = settingsLayout.findViewById(R.id.ratingBar);
        ratingBar.setRating((float) difficulty);
        final Switch soundSwitch = settingsLayout.findViewById(R.id.sound);
        soundSwitch.setChecked(sound);
        final Switch vibrationSwitch = settingsLayout.findViewById(R.id.vibration);
        vibrationSwitch.setChecked(vibration);

        soundSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                setSound();
            }
        });
        vibrationSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                setVibration();
            }
        });
        ratingBar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
                difficulty = (int) ratingBar.getRating();
            }
        });

        new AlertDialog.Builder(this)
                .setTitle(R.string.Settings)
                .setPositiveButton(R.string.Ok,
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                fx();
                                sound = soundSwitch.isChecked();
                                vibration = vibrationSwitch.isChecked();
                                writeParams();
                            }
                        })
                .setView(settingsLayout)
                .setIcon(R.drawable.settings)
                .setCancelable(false)
                .create()
                .show();
    }
}