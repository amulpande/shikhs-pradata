'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSearchParams } from 'next/navigation';

const VideoCallPage = ({  params  }: any) => {
  const meetingRef = useRef(null);
  const [reload, setReload] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'participant';
  const { roomCode } = params;

  useEffect(() => {
    const myMeeting = async (element: any) => {
      const appId = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID)
      const userID = Date.now().toString();
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRETE!
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomCode, userID, 'User')

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        // onUserJoin:'',
        // whiteboardConfig:'',
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol + '//' +
              window.location.host + window.location.pathname +
              '?roomID=' +
              roomCode
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showRemoveUserButton: role=='host',
        showAudioVideoSettingsButton: role=='host',
        showTurnOffRemoteCameraButton : role == 'host',
        showTurnOffRemoteMicrophoneButton : role == 'host',
        showRoomTimer: role == 'host',
      });
      
    }
    if (meetingRef.current) {
      myMeeting(meetingRef.current);
    }
  }, [roomCode,role])
  const data = roomCode
  return (
    <>
      <div>
        <div ref={meetingRef} />
      </div>
    </>
  )
}

export default VideoCallPage

