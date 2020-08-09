package com.makienkovs.sapper;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.SoundPool;
import android.util.Log;

public class Sound {
    private boolean sound;
    private SoundPool sounds;
    private int winSound;
    private int explosionSound;
    private int setSound;
    private int messageSound;
    private int tapSound;
    private Context context;

    Sound(Context context, boolean sound) {
        this.context = context;
        this.sound = sound;
        createSoundPool();
    }

    private void createSoundPool() {
        AudioAttributes attributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build();
        sounds = new SoundPool.Builder()
                .setAudioAttributes(attributes)
                .setMaxStreams(10)
                .build();

        winSound = sounds.load(context, R.raw.win, 1);
        explosionSound = sounds.load(context, R.raw.explosion, 1);
        setSound = sounds.load(context, R.raw.set, 1);
        messageSound = sounds.load(context, R.raw.message, 1);
        tapSound = sounds.load(context, R.raw.tap, 1);
    }

    void play(String soundName) {
        int s;
        switch (soundName){
            case "win": s = winSound; break;
            case "lose": s = explosionSound; break;
            case "set": s = setSound; break;
            case "message": s = messageSound; break;
            case "tap": s = tapSound; break;
            default: s = 0; Log.d("Unexpected value: ", ""+ soundName);
        }

        if (s > 0 && sound) {
            float volume = 1;
            try {
                sounds.play(s, volume, volume, 1, 0, 1);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    void stop(String soundName) {

    }

    void release() {
        sounds.release();
        sounds = null;
    }
}
