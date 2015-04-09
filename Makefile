install:
	npm install

build:
	gulp dist

run:
	gulp dev

sync:
	s3cmd --access_key=$(AMAZON_ACCESS_KEY_ID) --secret_key=$(AMAZON_SECRET_ACCESS_KEY) --delete-removed --acl-public --add-header="Cache-Control: no-cache" sync $(source) $(dest)

sync-preview:
	$(MAKE) sync source=./.tmp/* dest=s3://zooniverse-static/preview.zooniverse.org/transcribe/

deploy-preview: build sync-preview
