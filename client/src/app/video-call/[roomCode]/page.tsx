'use client'
import React, { useEffect, useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCallPage = ({ params }: any) => {
  const meetingRef = useRef(null);
  const roomID = params?.roomCode
  // console.log(roomID)

  useEffect(() => {


    const myMeeting = async (element: any) => {
      const appId = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID)
      // const appId = 1114224422
      // const serverSecret = 'b110dd738cdc4afad593c58e4f957505'
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRETE!
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomID, Date.now().toString(), 'User')

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol + '//' +
              window.location.host + window.location.pathname +
              '?roomID=' +
              roomID
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
    if (meetingRef.current) {
      myMeeting(meetingRef.current);
    }
  }, [roomID])

  return (
    <>
      <div>
        <div ref={meetingRef} />
      </div>
    </>
  )
}

export default VideoCallPage
