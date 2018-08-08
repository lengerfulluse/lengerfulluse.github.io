<!-- Script pointing to jekyll-search.js -->
<script type="text/javascript">
  SimpleJekyllSearch({
    searchInput: document.getElementById('search'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    noResultsText: ': (',
    limit: 10,
    fuzzy: false,
  })
</script>
