/**
 * The SubHeader of the WatchContent
 * - including setting bar, up next and video info
 */
import React, { useState, useEffect, lazy, Suspense } from 'react'
// UI
import { Icon } from 'semantic-ui-react'
import { api } from 'utils'
import { hasPIPFeature } from '../watchUtils'
import './index.css'

const ModeSetting = lazy(() => import('./ModeSetting'))

export default function SubHeader({ playlist, media, propsForSettingBar, isMobile }) {
  const [playlistName, setPlaylistName] = useState('')

  /** If playlist is loaded */
  useEffect(() => {
    if (playlist && playlist.medias) {
      setPlaylistName(() => playlist.name)
    }
  }, [playlist])

  const hasPip = hasPIPFeature()

  return (
    <div className="subheader-container" >
      <div className="header">
        <p tabIndex={1}>
          <strong>
            <span>{api.parseURLFullNumber()}</span>
            &ensp;{playlistName}
          </strong><br/>
          <Icon name="play" />
          {/* <Icon id="video-loading" name="circle notch" loading /> */}
          &ensp;{media.mediaName}
        </p>

        <div className="video-setting-bar">
          <Suspense fallback={<div>Loading...</div>}>
            {hasPip && <ModeSetting {...propsForSettingBar} isMobile={isMobile} />}
          </Suspense>
        </div>
      </div>
    </div>
  )
}