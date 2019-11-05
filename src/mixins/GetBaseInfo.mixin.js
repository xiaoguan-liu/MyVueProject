import { mapActions, mapGetters } from 'vuex'

const seaLoadingPort = {
  created: function () {
    if (!this.seaLoadingPorts || this.seaLoadingPorts.length <= 0) {
      this.GetSeaLoadingPorts()
    }
  },
  computed: {
    ...mapGetters(['seaLoadingPorts'])
  },
  methods: {
    ...mapActions(['GetSeaLoadingPorts'])
  }
}

const airLoadingPort = {
  created: function () {
    if (!this.airLoadingPorts || this.airLoadingPorts.length <= 0) {
      this.GetAirLoadingPorts()
    }
  },
  computed: {
    ...mapGetters(['airLoadingPorts'])
  },
  methods: {
    ...mapActions(['GetAirLoadingPorts'])
  }
}

const seaShipLine = {
  created: function () {
    if (!this.seaShipLines || this.seaShipLines.length <= 0) {
      this.GetSeaShipLines()
    }
  },
  computed: {
    ...mapGetters(['seaShipLines'])
  },
  methods: {
    ...mapActions(['GetSeaShipLines'])
  }
}

const airShipLine = {
  created: function () {
    if (!this.airShipLines || this.airShipLines.length <= 0) {
      this.GetAirShipLines()
    }
  },
  computed: {
    ...mapGetters(['airShipLines'])
  },
  methods: {
    ...mapActions(['GetAirShipLines'])
  }
}

const seaNodeMessageSeting = {
  created: function () {
    if (!this.messageSetings || this.messageSetings.length <= 0) {
      this.GetMessageSetings()
    }
  },
  computed: {
    ...mapGetters(['seaNodeMessageSetings'])
  },
  methods: {
    ...mapActions(['GetMessageSetings'])
  }
}

const noticeMessageSeting = {
  created: function () {
    if (!this.messageSetings || this.messageSetings.length <= 0) {
      this.GetMessageSetings()
    }
  },
  computed: {
    ...mapGetters(['noticeMessageSetings'])
  },
  methods: {
    ...mapActions(['GetMessageSetings'])
  }
}

export { seaLoadingPort, airLoadingPort, seaShipLine, airShipLine, seaNodeMessageSeting, noticeMessageSeting }
