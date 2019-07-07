/* eslint-disable quotes */
"use strict";

/*
 * Created with @iobroker/create-adapter v1.15.1
 */

const utils = require("@iobroker/adapter-core");
const io = require("socket.io-client");

class Nightscout extends utils.Adapter {

	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "nightscout",
		});
		this.on("ready", this.onReady.bind(this));
		//	this.on("objectChange", this.onObjectChange.bind(this));
		//	this.on("stateChange", this.onStateChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}


	async onReady() {
		this.setState("info.connection", false, true);
		const nsSocket = io(this.config.url, {
			path: "/socket.io",

		});


		nsSocket.on("connect", () => {
			this.setState("info.connection", true, true);
			this.log.info("connected to socket " + this.config.url);
			nsSocket.emit(
				'authorize', {
					client: 'web',
					secret: null,
					history: 48
				}

			);
			const urlPost = this.config.url.split("/")[2].split(".")[0];
			this.setObjectNotExists(urlPost, {
				type: "state",
				common: {
					name: this.config.url,
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".device", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".pumpBattery", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "number",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".clock", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".bolusiob", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".reservoir", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "number",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".bolusing", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".status", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".suspended", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".uploaderBattery", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "number",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".mgdl", {
				type: "state",
				common: {
					name: "mgdl",
					role: "number",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".mgdlTimestamp", {
				type: "state",
				common: {
					name: "mgdl Timestamp",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});

			this.setObjectNotExists(urlPost + ".mgdlScaled", {
				type: "state",
				common: {
					name: "mgdl Scaled",
					role: "number",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".mgdlDirection", {
				type: "state",
				common: {
					name: "mgdl Direction",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".lastUpdate", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".rawUpdate", {
				type: "state",
				common: {
					name: "raw update as JSON",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});

		});
		nsSocket.on("notification", (data) => {

			const urlPost = this.config.url.split("/")[2].split(".")[0];
			this.log.debug("notification: " + JSON.stringify(data));
			this.setObjectNotExists(urlPost + ".notification", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setObjectNotExists(urlPost + ".notificationTimestamp", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setState(urlPost + ".notification", data.title + " " + data.message, true);
			this.setState(urlPost + ".notificationTimestamp", data.timestamp, true);
		});
		nsSocket.on('announcement', (data) => {
			this.log.info(data);
		});
		nsSocket.on('alarm', (data) => {

			const urlPost = this.config.url.split("/")[2].split(".")[0];
			this.setObjectNotExists(urlPost + ".alarm", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setState(urlPost + ".alarm", data, true);
		});
		nsSocket.on('urgent_alarm', (data) => {

			const urlPost = this.config.url.split("/")[2].split(".")[0];
			this.setObjectNotExists(urlPost + ".urgent_alarm", {
				type: "state",
				common: {
					name: "",
					role: "indicator",
					type: "mixed",
					write: false,
					read: true
				},
				native: {}
			});
			this.setState(urlPost + ".urgent_alarm", data, true);
		});
		nsSocket.on("dataUpdate", (data) => {

			this.log.debug("dataUpdate: " + JSON.stringify(data));
			const urlPost = this.config.url.split("/")[2].split(".")[0];
			try {
				const dataUpdate = data;
				this.setState(urlPost + ".rawUpdate", JSON.stringify(dataUpdate), true);
				let len = 0;

				if (dataUpdate.lastUpdate) {
					this.setState(urlPost + ".lastUpdate", dataUpdate.lastUpdated, true);
				}

				if (dataUpdate.devicestatus && dataUpdate.devicestatus.length !== 0) {
					len = dataUpdate.devicestatus.length - 1;
					this.setState(urlPost + ".device", dataUpdate.devicestatus[len].device, true);
					this.setState(urlPost + ".pumpBattery", dataUpdate.devicestatus[len].pump.battery.percent, true);
					this.setState(urlPost + ".clock", dataUpdate.devicestatus[len].pump.clock, true);
					this.setState(urlPost + ".bolusiob", dataUpdate.devicestatus[len].pump.iob.bolusiob, true);
					this.setState(urlPost + ".reservoir", dataUpdate.devicestatus[len].pump.reservoir, true);
					this.setState(urlPost + ".bolusing", dataUpdate.devicestatus[len].pump.status.bolusing, true);
					this.setState(urlPost + ".status", dataUpdate.devicestatus[len].pump.status.status, true);
					this.setState(urlPost + ".suspended", dataUpdate.devicestatus[len].pump.status.suspended, true);
					this.setState(urlPost + ".uploaderBattery", dataUpdate.devicestatus[len].uploader.battery, true);
				}
				if (dataUpdate.sgvs && dataUpdate.devicestatus.sgvs !== 0) {
					len = dataUpdate.sgvs.length - 1;
					this.setState(urlPost + ".mgdl", dataUpdate.sgvs[len].mgdl, true);
					this.setState(urlPost + ".mgdlScaled", dataUpdate.sgvs[len].scaled, true);
					this.setState(urlPost + ".mgdlDirection", dataUpdate.sgvs[len].direction, true);
					this.setState(urlPost + ".mgdlTimestamp", dataUpdate.sgvs[len].mills, true);
				}



			} catch (error) {
				this.log.error("Parse Error: " + error + " " + JSON.stringify(data));
			}
		});

		//		await this.setStateAsync("testVariable", true);

	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			this.log.info("cleaned everything up...");
			callback();
		} catch (e) {
			callback();
		}
	}

	/**
	 * Is called if a subscribed object changes
	 * @param {string} id
	 * @param {ioBroker.Object | null | undefined} obj
	 */
	onObjectChange(id, obj) {
		if (obj) {
			// The object was changed
			this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
		} else {
			// The object was deleted
			this.log.info(`object ${id} deleted`);
		}
	}

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}

}

// @ts-ignore parent is a valid property on module
if (module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Nightscout(options);
} else {
	// otherwise start the instance directly
	new Nightscout();
}