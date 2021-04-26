<template>
    <header class="section header" ref="headerWrapper">
        <div class="panel image-panel" ref="imagePanel" >
            <img class="header-image mobile-image" src="../../assets/img/pl-h-m.png" alt="">
            <img class="header-image desktop-image" :style="desktopImageClip"
                 src="../../assets/img/pl-h-d.png" alt="">
        </div>
        <div class="panel color-overlay" ref="overlayPanel"></div>
        <div class="panel content-panel" :style="contentClip">
            <prismic-rich-text :field="slice.primary.title" class="title"/>
            <prismic-rich-text :field="slice.primary.description"/>
        </div>

        <div class="panel content-panel-lit">
            <prismic-rich-text :field="slice.primary.title" class="title"/>
            <prismic-rich-text :field="slice.primary.description"/>
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
            y: 50,
            desktopCircle: 200
        }
    },

    mounted() {
        this.setUpWatchers();
    },

    computed: {
        headerClip() {
            return {
                clipPath: `circle(${this.desktopCircle}px at ${this.x}% ${this.y}%)`
            }
        },

        desktopImageClip() {
            return {
                clipPath: `circle(${this.desktopCircle}px at ${this.x * 2}% ${this.y}%)`
            }
        },

        contentClip() {
            return {
                clipPath: `circle(${this.desktopCircle}px at ${(this.x * 2) - 100}% ${this.y}%)`
            }
        }
    },

    methods: {
        setUpWatchers() {
            if (this.$refs && this.$refs.headerWrapper) {
                let header = this.$refs.headerWrapper;
                let panel = this.$refs.overlayPanel;
                let width = panel.getBoundingClientRect().width;
                let height = panel.getBoundingClientRect().height;

                let setXY = (x, y) => {
                    this.x = x;
                    this.y = y;
                }

                header.addEventListener('mousemove', throttle(function(event) {
                    const {
                        clientX,
                        clientY
                    } = event;

                    let x = Math.floor(clientX / width * 100);
                    let y = Math.floor(clientY / height * 100);
                    setXY(x, y);

                }, 100));
            }
        }
    }
}
</script>
