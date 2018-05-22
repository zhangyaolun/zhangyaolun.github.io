<template>
	<div>
		<div @click="startRecording">
	  	开始
	  </div>
	  <br />
	  <div @click="stopRecording">
	  	停止
	  </div>
	  <br />
	  <div v-for="(recording,idx) in recordings" :key="recording.ts">
		  <audio :src="recording.blobUrl" controls="true"/>
		</div>
	</div>
</template>

<script>
import RecorderService from '@/shared/RecorderService'
import utils from '@/shared/Utils'

export default {
  name: 'HelloWorld',
  filters: {
    fileSizeToHumanSize (val) {
      return utils.humanFileSize(val, true)
    }
  },
  data () {
    return {
      recordingInProgress: false,
      supportedMimeTypes: [],
      recordings: [],
      micGainSlider: 100,
      micGain: 1.0,
      cleanupWhenFinished: true,
      addDynamicsCompressor: false
    }
  },
  created () {
    this.recorderSrvc = new RecorderService()
    this.recorderSrvc.em.addEventListener('recording', (evt) => this.onNewRecording(evt))
  },
  watch: {
    cleanupWhenFinished (val) {
      this.recorderSrvc.config.stopTracksAndCloseCtxWhenFinished = this.cleanupWhenFinished
    },
    micGainSlider () {
      this.micGain = (this.micGainSlider * 0.01).toFixed(2)
      this.recorderSrvc.setMicGain(this.micGain)
    }
  },
  methods: {
    startRecording () {
      this.recorderSrvc.config.stopTracksAndCloseCtxWhenFinished = this.cleanupWhenFinished
      this.recorderSrvc.config.createDynamicsCompressorNode = this.addDynamicsCompressor
      this.recorderSrvc.startRecording()
        .then(() => {
          this.recordingInProgress = true
        })
        .catch((error) => {
          console.error('Exception while start recording: ' + error)
          alert('Exception while start recording: ' + error.message)
        })
    },
    stopRecording () {
      this.recorderSrvc.stopRecording()
      this.recordingInProgress = false
    },
    onNewRecording (evt) {
    	console.log(evt)
      this.recordings.push(evt.detail.recording)
    }
  }
}
</script>
<style>
</style>
