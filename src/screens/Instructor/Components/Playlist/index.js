import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { connectWithRedux } from '_redux/instructor'
import { withRouter } from 'react-router'

import { Filter } from '../Filter'
import { ListItem } from '../ListItem'
import { PlaceHolder } from '../Placeholder'

import PlaylistInfo from './PlaylistInfo'
import ButtonBar from './ButtonBar'
import Video from './Video'

// import NoPlaylistHolder from './NoPlaylistHolder'
import NoVideoHolder from './NoVideoHolder'

import NewPlaylist from './NewPlaylist'
import UploadVideo from './UploadVideo'

import {  
  filterControl, 
  NEW_PLAYLIST, OFF_ANALYSIS, 
  NEW_OFFERING, HIDE_PLAYLIST, NO_PLAYLIST, NO_OFFERING_ID,
} from '../../Utils'
import './index.css'


function PlaylistWithRedux({
  playlist={},
  offering={},
  isEditingOffering=false,
  isViewingAnalytics=false,
}) {

  // Determine the context
  let newOffering = offering === NEW_OFFERING
  let noPlaylist = playlist === NO_PLAYLIST
  let canShowPlaylists = Boolean(playlist.id) 
                      && (playlist !== OFF_ANALYSIS && playlist !== NEW_PLAYLIST)

  // Media results to display
  const [results, setResults] = useState([])
  const onFilter = value => filterControl.filterMedias(value, playlist.medias, setResults)
  const onReverse = () => filterControl.reverse(results, setResults)

  // Determine whether to display upload screen
  const [isUploading, setIsUploading] = useState(false)
  const onOpenUpload = () => setIsUploading(true)
  const onCloseUpload = () => setIsUploading(false)

  // Current selected media
  const [currMediaId, setCurrMediaId] = useState('')
  const openMediaId = mediaId => () => setCurrMediaId(mediaId)
  const closeMediaId = () => setCurrMediaId('')

  // Update results when playlist changes
  useEffect(() => {
    if (canShowPlaylists) {
      setResults(playlist.medias || [])
      if (isUploading) setIsUploading(false)
    }
  }, [playlist])

  // Conditions not display playlist
  if (isEditingOffering || isViewingAnalytics) return null
  if (!offering.id) return null
  if (newOffering || playlist === HIDE_PLAYLIST) return null
  
  // Special contexts
  // if (noPlaylist) return <NoPlaylistHolder />
  if (playlist === NEW_PLAYLIST || noPlaylist) return <NewPlaylist offeringId={offering.id} noPlaylist={noPlaylist} />
  if (isUploading) return <UploadVideo playlist={playlist} onClose={onCloseUpload} />
  

  return (
    <div className="ip-playlist-con">
      {
        canShowPlaylists ?
        <div className="w-100 h-auto ct-a-fade-in">
          {/* Playlist Info */}
          <PlaylistInfo playlist={playlist} />

          {/* Title */}
          <div className="ip-sb-title ct-d-r-center-v mt-3">
            <i className="material-icons" aria-hidden="true">video_library</i>
            <h3>VIDEOS</h3>
          </div>
          
          {/* Upload Video Button & Filter */}
          <div className="w-100">
            {
              playlist.sourceType === 2
              &&
              <ListItem dark
                icon="add"
                title=" UPLOAD VIDEOS"
                onClick={onOpenUpload}
              />
            }

            <Filter //darker
              searchFor="Videos" 
              onFilter={onFilter} 
              onReverse={onReverse} 
            />
          </div>

          {/* Selecting Buttons */}
          <ButtonBar results={results} />
          
          {/* Video Items */}
          {
            results.length === 0
            ?
            <NoVideoHolder type={playlist.sourceType} />
            :
            <div className="ct-list-col ip-videos">
              {results.map( me => (
                <Video 
                  key={me.id} 
                  media={me} 
                  current={me.id === currMediaId}
                  closeMedia={closeMediaId}
                  openMediaId={openMediaId}
                  courseNumber={offering.courseNumber}
                />
              ))}
            </div>
          }
          
        </div>
        :
        <PlaceHolder />
      }
    </div>
  )
}

export const Playlist = withRouter(connectWithRedux(
  PlaylistWithRedux,
  [
    'offering',
    'playlist',
    'isEditingOffering',
    'isViewingAnalytics'
  ],
  []
))