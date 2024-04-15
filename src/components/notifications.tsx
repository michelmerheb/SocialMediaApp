import notifee from '@notifee/react-native'
import React from 'react'
import { View, Button } from 'react-native'

export async function onDisplayNotification() {

    //Request permission for ios
    await notifee.requestPermission()

    //create channel for android
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    })

    //Display notification
    await notifee.displayNotification({
        title: 'Hii mf',
        body: 'Main body',
        android: {
            channelId,
            smallIcon: 'logo',
            pressAction: {
                id: 'default',
            },
        },
    });


}