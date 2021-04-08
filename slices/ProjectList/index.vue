<template>
    <section class="section project-list">
        <div class="category" v-for="category in categories" :key="`category-${category.category}`" :class="category.category">
            <h3 class="category-header">{{category.fullName}}</h3>

            <div v-for="(item, i) in category.items" :key="`slice-item-${category}-${i}`" class="project-teaser">
                <div class="teaser-image" v-if="item.companyLogo">
                    <prismic-image :class="{'empty': !item.companyLogo.url}" :field="item.companyLogo" />
                </div>
                <div class="teaser-content" v-if="item.projectName">
                    <prismic-rich-text class="company" :field="item.companyName" />
                    <prismic-rich-text class="project" :field="item.projectName"/>

                    <div class="project-types">
                        <div class="project-type" v-for="type in item.types">
                            <div class="dot" :style="{'background': findColor(type)}"></div>
                            <p>{{findFullName(type)}}</p>
                        </div>
                    </div>

                    <prismic-link class="read-more" v-if="item.link && item.link.url" :field="item.link">Lees meer</prismic-link>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    name: 'ProjectList',

    props: {
        slice: {
            type: Object,
            required: true,
            default() {
                return {}
            },
        },
    },

    computed: {
        categories() {
            function parseTypes(item) {
                let types = [];
                for (const [key, value] of Object.entries(item)) {
                    if(key !== "companyName" && key !== "companyLogo" && key !== "projectName" && key !== "link") {
                        if(value) types.push(key);
                    }
                }

                return types;
            }

            if(this.slice && this.slice.items && this.slice.items.length) {
                let items = this.slice.items.map((item, index) => ({
                    ...item,
                    types: parseTypes(item)
                }));

                let categories = [];
                let categoryNames = [...new Set(items.map(item => {
                    if(item.types && item.types.length > 0) {
                        return item.types[0]
                    }
                }))];

                categoryNames.forEach(category => {
                    categories.push({
                        category: category,
                        items: items.filter(item => {
                            if(item.types && item.types.length > 0) {
                                return item.types[0] === category;
                            }
                        }),
                        color: this.findColor(category),
                        fullName: this.findFullName(category)
                    })
                })

                return categories;
            }
        }
    },

    methods: {
        findColor(category) {
            switch(category) {
                case 'innovaties':
                    return '#015238';
                case 'woningeigenaren':
                    return '#8ed1d2';
                case 'verdienmodellen':
                    return '#DB5461';
                case 'grondstoffen':
                    return '#fecb00';
                case 'empowerment':
                    return '#ea5d24';
                case 'beperkteruimte':
                    return '#52489C';
                case 'renovatieconcepten':
                    return '#CA907E';
                case 'koplopers':
                    return '#8CDFD6';
                case 'wijkaanpak':
                    return '#92898A';
                default:
                    return '#015238'
            }
        },
        findFullName(category) {
            switch(category) {
                case 'innovaties':
                    return 'Inzicht creëren in bestaande innovaties';
                case 'woningeigenaren':
                    return 'Aanbod en begeleiding particuliere woningeigenaren';
                case 'verdienmodellen':
                    return 'Nieuwe verdienmodellen';
                case 'grondstoffen':
                    return 'Grondstoffen verstandig gebruiken';
                case 'empowerment':
                    return 'Empowerment bewoners';
                case 'beperkteruimte':
                    return 'Energie-opwek op beperkte ruimte';
                case 'renovatieconcepten':
                    return 'Prijs-kwaliteits-verbetering van renovatieconcepten';
                case 'koplopers':
                    return 'Verbinden ambitieuze koplopers';
                case 'wijkaanpak':
                    return 'Wijkaanpak integraler maken';
                default:
                    return 'test'
            }
        }
    }
}
</script>