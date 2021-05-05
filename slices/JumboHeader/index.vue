<template>
    <header class="section header" ref="headerWrapper" @touchstart="setUpGyro()" @click="setUpGyro()">
        <div class="panel image-panel" ref="imagePanel">
            <img class="header-image mobile-image" src="../../assets/img/header_wide.jpg" alt="" :style="mobileImageClip">
            <img class="header-image desktop-image" :style="desktopImageClip"
                 src="../../assets/img/header_desktop.jpg" alt="">
        </div>

        <div class="panel color-overlay" ref="overlayPanel"></div>

        <div class="panel gyro-tester" v-if="debug">
            <p>(x,y)</p>
            <p id="beta">{{ y }}</p>
            <p id="gamma">{{ x }}</p>
        </div>

        <div class="panel content-panel" :style="contentClip">
            <prismic-rich-text :field="slice.primary.title" class="title"/>
            <prismic-rich-text :field="slice.primary.description"/>

            <div class="scroll-helper">
                <p class="scroll-helper-text">Scroll verder</p>
                <p class="scroll-helper-icon">↓</p>
            </div>

        </div>

        <div class="panel content-panel-lit">
            <prismic-rich-text :field="slice.primary.title" class="title"/>
            <prismic-rich-text :field="slice.primary.description"/>

            <div class="scroll-helper">
                <p class="scroll-helper-text">Scroll verder</p>
                <p class="scroll-helper-icon">↓</p>
            </div>
        </div>
    </header>
</template>

<script>
import {throttle} from 'lodash';

export default {
    props: {
        slice: {
            type: Object,
            required: true,
            default() {
                return {}
            },
        },
    },

    data() {
        return {
            x: 20,
            y: 30,
            desktopCircle: 20,
            debug: false,
            gyro: false,
            searchlight: null
        }
    },

    mounted() {
        this.setUpMouse();
    },

    computed: {
        headerClip() {
            return {
                clipPath: `circle(${this.desktopCircle}vw at ${this.x}% ${this.y}%)`
            }
        },

        desktopImageClip() {
            return {
                clipPath: `circle(${this.desktopCircle}vw at ${this.x * 2}% ${this.y}%)`
            }
        },

        mobileImageClip() {
            return {
                clipPath: `circle(${this.desktopCircle}vw at ${this.x}% ${(this.y) * 2}%)`
            }
        },

        contentClip() {
            if(this.$refs.headerWrapper && this.$refs.headerWrapper.getBoundingClientRect() && this.$refs.headerWrapper.getBoundingClientRect().width < 768) {
                return {
                    clipPath: `circle(${this.desktopCircle}vw at ${this.x}% ${(this.y * 2) - 100}%)`
                }
            } else {
                return {
                    clipPath: `circle(${this.desktopCircle}vw at ${(this.x * 2) - 100}% ${this.y}%)`
                }
            }

        }
    },

    methods: {
        setUpMouse() {
            if (this.$refs && this.$refs.headerWrapper) {
                let header = this.$refs.headerWrapper;
                let panel = this.$refs.overlayPanel;
                let width = panel.getBoundingClientRect().width;
                let height = panel.getBoundingClientRect().height;

                let setXY = (x, y) => {
                    this.x = x;
                    this.y = y;
                }

                // Check if touch device, otherwise use mouse
                if ('ontouchend' in window) {
                    // console.log('Skipping mouse watcher, has touchscreen');
                    // console.log('setting searchlight');
                    // Also set up small wobble animation for people who do not want the gyro to be active
                    // this.searchlight = setInterval(() => {
                    //     // console.log('randomizing x&y');
                    //     this.x = Math.random() * 100;
                    //     this.y = Math.random() * 100;
                    // }, 3000);
                } else {
                    console.log('no touch screen, setting up mouse watcher');
                    header.addEventListener('mousemove', throttle(function (event) {
                        const {clientX, clientY} = event;

                        let x = Math.floor(clientX / width * 100);
                        let y = Math.floor(clientY / height * 100);
                        setXY(x, y);

                    }, 100));
                }
            }
        },

        setUpGyro() {
            // console.log('setting up gyro...');
            // if(this.searchlight) {
            //     // console.log('clearing searchlight, gyro taking over');
            //     clearInterval(this.searchlight);
            // }
            if ('ontouchend' in window) {
                // this.debug = true;

                if (this.$refs && this.$refs.headerWrapper && !this.gyro) {
                    let panel = this.$refs.overlayPanel;
                    let width = panel.getBoundingClientRect().width;
                    let height = panel.getBoundingClientRect().height;

                    let setXY = (x, y) => {
                        this.x = x;
                        this.y = y;
                    }

                    // console.log('has touchscreen and user touched header, setting up gyroscope watcher');

                    let setGyro = function (e) {
                        const {beta, gamma} = e;

                        // First do gamma axis, which controls the x position of the bubble
                        let gammaX = ((gamma + 25) / 50);
                        if (gammaX > 1) gammaX = 1;
                        if (gammaX < 0) gammaX = 0;
                        let x = Math.floor(gammaX * 100);

                        // Then pick the beta axis, which controls the y position of the bubble
                        let betaY = ((beta + 25) / 50);
                        if (betaY > 1) betaY = 1;
                        if (betaY < 0) betaY = 0;
                        let y = Math.floor(betaY * 100);

                        setXY(x, y);
                    }

                    if (window.DeviceOrientationEvent) {
                        if (typeof DeviceMotionEvent.requestPermission === 'function') {
                            // Handle iOS 13+ devices.
                            DeviceMotionEvent.requestPermission()
                                .then((state) => {
                                    if (state === 'granted') {
                                        window.addEventListener('devicemotion', setGyro);
                                    } else {
                                        console.error('Request to access the orientation was rejected');
                                    }
                                })
                                .catch(console.error);
                        } else {
                            // Handle regular non iOS 13+ devices.
                            window.addEventListener('devicemotion', setGyro);
                        }
                        window.addEventListener("deviceorientation", setGyro);
                    } else {
                        console.log("Device motion permission access method not available");
                    }

                    this.gyro = true;
                }
            }
        }
    }
}
</script>
