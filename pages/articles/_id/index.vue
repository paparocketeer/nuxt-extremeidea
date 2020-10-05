<template>
  <div>
    <h1 class="text-center text-info">Товар</h1>

    <div class="alert alert-success" v-if="$route.params.updated == 'yes'">
      Record updated successfully
    </div>
    <b-row class="mb-3">
      <b-col cols="12" md="6" class="mt-3">
        <b-img
          class="border rounded-lg"
          :src="article.imageURL"
          fluid
          :alt="article.title"
        ></b-img>
      </b-col>

      <b-col cols="12" md="6" class="mt-3">
        <em>{{ article.type }}</em>
        <h2>{{ article.sku }}</h2>
        <p class="font-weight-small">
          {{ `Количество товара: ${article.totalStock}` }}
        </p>
        <p class="font-weight-bold text-success article-price">
          {{ `${article.retailPrice} грн` }}
        </p>
        <p>{{ article.title }}</p>
      </b-col>
    </b-row>

    <hr />
    <h3 class="text-center text-info">Похожие товары</h3>
    <b-row class="mb-3">
      <b-col
        cols="12"
        md="6"
        lg="4"
        class="mt-3"
        v-for="article in featured"
        :key="article._id"
      >
        <nuxt-link
          class="border rounded-lg d-block p-3 article-link"
          :to="'/articles/' + article._id"
        >
          <b-img :src="article.imageURL" fluid :alt="article.title"></b-img>
          <div class="d-flex justify-content-between align-items-end">
            <div
              class="d-flex flex-column justify-content-between align-items-center"
            >
              <span class="font-weight-light">{{ article.type }}</span>
              <span class="font-weight-bold">{{ article.sku }}</span>
            </div>
            <div class="font-weight-bold text-success">
              {{ `${article.retailPrice} грн` }}
            </div>
          </div>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      featured: []
    };
  },

  async asyncData(context) {
    const { data } = await context.$axios.get(
      "/api/articles/" + context.route.params.id
    );
    return {
      article: data
    };
  },
  mounted() {
    this.fetchFeatured();
  },

  methods: {
    async fetchFeatured() {
      const featured = await this.$axios.$get("/api/articles");
      const shuffled = featured.sort(() => 0.5 - Math.random());
      this.featured = featured.slice(0, 3);
    }
  }
};
</script>

<style lang="scss">
.article-price {
  font-size: 2em;
}
</style>
