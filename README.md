Alfresco Backbone.js Sample
========================

This project helps you to get started with building a Backbone.js application within Alfresco Share.

## Installation

1. Sync the project code.

2. Add a new properties file, custom-build.properties , under the project root and set the property for your alfresco installation directory e.g.

```
alfresco.dir=/opt/alfresco
```

3. Either run the ant command to copy the module files to your Alfresco directory.

```
ant
```

4. Or use the ant script to build the AMP package file and install it with your Alfresco instance.

```
ant package-amp
```

## Usage

1. Create a Share site.

2. Add a plain text document to the site document library.

3. Access the sample Backbone.js application using the following link (replace the text in the brackets with your actual site url name and document nodRef)

```
http://localhost:8080/share/page/site/[Your Site URL Name]/alfresco-backbone-sample?nodeRef=[Your Document NodeRef]
```