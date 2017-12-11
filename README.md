# Terminology Service Widgets
The Terminology Service provides widgets – that are components, "chunks of web page" or small applications – intended to be used within web pages. The widgets deliver a restricted functionality, often for just one purpose, like displaying data or providing an interface. Typically, a widget contains a mixture of HTML, CSS and JavaScript where the complexity is ideally hidden to make it as easy as possible for developers to integrate the widgets to their application or website with little configuration and programming skills needed. All of our widgets use the Terminology Service API and thus, users can quickly expand their local service with all the functionalities provided by the GFBio TS API. Our goal is to provide reusable and easy to use widgets to be integrated and reused easily with none or little knowledge in web development.

Find more information under https://terminologies.gfbio.org/ and https://terminologies.gfbio.org/api/

# Search Widget
The search widget provides an easy-to-use interface to the API of the Terminology Service to search for terms to determine their usefulness for the work of scientists, e.g. for annotating research data in the GFBio Data Portal.
The search service includes all labels, synonyms, common names and abbreviations when provided by terminologies. It is additionally possible to extend the search to external terminologies by checking the corresponding box below the search box. However, this might extensively slower down the response time of the search service.

Find a running example under http://terminologies.gfbio.org/search/