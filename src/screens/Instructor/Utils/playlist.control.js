import _ from 'lodash'
import { util, api } from 'utils'
import { setup } from './setup.control'
import { promptControl } from './prompt.control'

const echo360Prefix = 'https://echo360.org/section/'
const boxPrefix = 'https://uofi.app.box.com/folder/'

// const initPlaylist = {
//   name: '',
//   offeringId: '',
//   sourceType: 2,
//   playlistIdentifier: ''
// }

export const plControl = {
  externalFunctions: {},
  // playlist_: initPlaylist,

  init: function(props) {
    const { setPlaylists, setPlaylist } = props
    this.externalFunctions = { setPlaylists, setPlaylist }
  },

  // playlistSet: function(key, value) {
  //   if (value === undefined) {
  //     return _.get(this.playlist_, key)
  //   }
  //   _.set(this.playlist_, key, value)
  // },

  // name: function(val) {
  //   this.playlistSet('name', val)
  // },
  // offeringId: function(val) {
  //   this.playlistSet('offeringId', val)
  // },
  // sourceType: function(val) {
  //   this.playlistSet('sourceType', val)
  // },
  // indentifier: function(val) {
  //   this.playlistSet('playlistIdentifier', val)
  // },

  createPlaylist: async function(playlist) {
    setup.loading()
    let { offeringId, name, sourceType, playlistIdentifier } = playlist

    // Check validity
    if (!offeringId || !name) return;
    if (!this.isValidIdURL(sourceType, playlistIdentifier)) return;

    // extract playlistIdentifier
    if (sourceType === 1) { // YouTube
      let { list } = util.parseSearchQuery(playlistIdentifier)
      playlistIdentifier = list
    }

    let newPl = { offeringId, name, sourceType, playlistIdentifier }
    console.log('newPl', newPl)
    try {
      let { data } = await api.createPlaylist(newPl)
      newPl = data
    } catch (error) {
      setup.unloading()
      promptControl.failedToSave('playlist')
      return
    }

    newPl.medias = []
    setup.playlists([ ...setup.playlists(), newPl ])
    setup.changePlaylist(newPl)

    setup.unloading()
  },

  renamePlaylist: async function(playlist, newName) {
    // setup.loading()
    promptControl.saving()

    try {
      playlist.name = newName
      await api.updatePlaylist(playlist)
      setup.playlist(playlist, 0)
      promptControl.updated('Playlist name')
    } catch (error) {
      promptControl.failedToUpdate('playlist name')
      console.error(`failed to rename playlist ${playlist.id}`)
    }

    // setup.unloading()
  },

  deletePlaylist: async function(playlist) {
    promptControl.deleting()
    try {
      await api.deletePlaylist(playlist.id)
      let playlists = setup.playlists()
      _.remove(playlists, pl => pl.id === playlist.id)
      setup.playlists([ ...playlists ])
      promptControl.deleted('Playlist')
    } catch (error) {
      promptControl.failedToDelete('playlist')
      console.error(`failed to delete playlist ${playlist.id}`)
    }
  },

  /**
   * Helpers
   */
  isValidIdURL: function(sourceType, url='') {
    if (sourceType === 2) return true
    if (!url) return false

    if (sourceType === 0) { // Echo360
      return _.startsWith(url, echo360Prefix)

    } else if (sourceType === 1) { // YouTube
      let { list } = util.links.useSearch(url)
      return Boolean(list)

    } else if (sourceType === 4) { // Box
      return _.startsWith(url, 'https://') 
            && url.includes('box.com') 
            && url.includes('/folder/')
    }

    return false
  }
}