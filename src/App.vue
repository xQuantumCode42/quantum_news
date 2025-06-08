<template>
  <div>
    <h1>News Feed</h1>
    <ul>
      <li v-for="item in news" :key="item.title">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import Parser from 'rss-parser';

export default {
  data() {
    return {
      news: [],
    };
  },
  methods: {
    async fetchNews() {

      const fetchUrl = `/api/rss?url=${encodeURIComponent('https://news.google.com/rss')}`;
      fetch(fetchUrl)
        .then(response => response.text())
        .then(xml => console.log(xml));

      try {
        const response = await fetch(fetchUrl);
        const xml = await response.text();
        console.log(xml);
        const parser = new Parser();
        const feed = await parser.parseString(xml);
        this.news = feed.items;
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>