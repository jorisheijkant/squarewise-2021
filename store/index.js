export const strict = false;

export const state = () => ({
   chapters: []
});

export const mutations = {
    addChapter(state, {title: title, slug: slug, image: image}) {
        state.chapters.push({
            slug: slug,
            title: title,
            image: image
        });
    }
}