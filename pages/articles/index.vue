<template>
  <div>
    <!-- <div class="d-flex justify-content-between align-items-center"> -->
    <div>
      <h1 class="text-center text-info">Наша продукция</h1>
      <!-- <nuxt-link to="/articles/add" class="btn btn-success">Add New</nuxt-link> -->
    </div>

    <div class="alert alert-success" v-if="$route.params.created == 'yes'">
      Record added successfully
    </div>
    <div class="alert alert-success" v-if="$route.params.deleted == 'yes'">
      Record deleted successfully
    </div>

    <b-container v-if="articles.length">
      <b-row class="mb-3">
        <b-col cols="12" md="6" lg="4" v-for="article in articles" :key="article._id" class="mt-3">
          <nuxt-link
            class="border rounded-lg d-block p-3 article-link"
            :to="'/articles/' + article._id"
          >
          <b-img :src="article.imageURL" fluid :alt="article.title"></b-img>
          <div class="d-flex justify-content-between align-items-end">
            <div class="d-flex flex-column justify-content-between align-items-center">
              <span class="font-weight-light">{{article.type}}</span>
              <span class="font-weight-bold">{{article.sku}}</span> 
            </div>
            <div class="font-weight-bold text-success">{{`${article.retailPrice} грн`}}</div>
          </div>
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <div class="alert alert-info">
        Не найдено товаров
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData(context) {
    const { data } = await context.$axios.get("/api/articles");
    return {
      articles: data
    };
  }
};
</script>

<style lang="scss">
  .article-link:hover{
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
  }
</style>
