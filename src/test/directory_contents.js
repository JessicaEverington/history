// /*global describe, it, require*/
// var expect = require("expect.js");

// describe('Admin:', function () {
// 	describe('Directory contents API:', function () {
// 		var page = require("../js/lib/directory_contents.js");
// 		describe('getContents()', function () {
// 			it('should fail with missing callback (a1)', function (done) {
// 				expect(page.getContents).to.throwException(function (exception) { // get the exception object
// 					expect(exception).to.be.a(ReferenceError);
// 					done();
// 				});
// 			});
// 			it('should display the root directory contents (a2)', function (done) {
// 				function callback (arg) {
// 					expect(arg.currentFolder).to.be.a('string');
// 					expect(arg.currentFolder).to.be('');
// 					done();
// 				}
// 				page.getContents(undefined, callback);
// 			});
// 			it('should fail with missing path (a3)', function (done) {
// 				var path = "fail_test_path/";
// 				function callback (arg) {
// 					expect(arg.error).to.contain(page.error.missingPath);
// 					done();
// 				}
// 				page.getContents({"folder": path}, callback);
// 			});
// 			it('should fail with missing files (a4)', function (done) {
// 				var path = "test/fixture/childless/";
// 				function callback (arg) {
// 					expect(arg.error).to.contain(page.error.missingFiles);
// 					done();
// 				}
// 				page.getContents({"folder": path}, callback);
// 			});
// 			it('should match current folder and filenames (a5)', function (done) {
// 				var path = "test/fixture/cjt/";
// 				function callback (arg) {
// 					expect(arg).to.be.an('object');
// 					expect(arg.currentFolder).to.be.a('string');
// 					expect(arg.currentFolder).to.contain(path);
// 					expect(arg.filenames).to.be.an('array');
// 					expect(arg.filenames).to.contain('cee.css');
// 					expect(arg.filenames).to.contain('jay.js');
// 					expect(arg.filenames).to.contain('tee.txt');
// 					expect(arg.error).to.be.an('undefined');
// 					done();
// 				}
// 				page.getContents({"folder": path}, callback);
// 			});
// 		});
// 		describe('generateJson()', function () {
// 			it('should fail without argument (b1)', function (done) {
// 				var arg;
// 				expect(page.generateJson).withArgs(arg).to.throwException(function (exception) { // get the exception object
// 					expect(exception).to.be.a(ReferenceError);
// 					expect(page.generateJson).withArgs(arg).to.throwException(new RegExp(page.error.missingArg));
// 					done();
// 				});
// 			});
// 			it('should fail without current folder (b2)', function (done) {
// 				var arg = {};
// 				expect(page.generateJson).withArgs(arg).to.throwException(function (exception) { // get the exception object
// 					expect(exception).to.be.a(ReferenceError);
// 					expect(page.generateJson).withArgs(arg).to.throwException(new RegExp(page.error.missingArgCurrentFolder));
// 					done();
// 				});
// 			});
// 			it('should fail without filenames (b3)', function (done) {
// 				var arg = {"currentFolder":""};
// 				expect(page.generateJson).withArgs(arg).to.throwException(function (exception) { // get the exception object
// 					expect(exception).to.be.a(ReferenceError);
// 					expect(page.generateJson).withArgs(arg).to.throwException(new RegExp(page.error.missingArgFilenames));
// 					done();
// 				});
// 			});
// 			it('should emit JSON with exact structure (b4)', function (done) {
// 				var json,
// 					path = "test/fixture/cjt";
// 				json = page.getContents({"folder": path}, page.generateJson);
// 				expect(json).to.have.key('items');
// 				expect(json.items).to.be.an('array');
// 				expect(json.items).to.have.length(3);
// 				expect(json.items[0]).to.only.have.keys('name', 'ext', 'path', 'content');
// 				expect(json.items[1].name).to.be('jay');
// 				expect(json.items[1].ext).to.be('.js');
// 				expect(json.items[2].path).to.only.have.keys('abs', 'nav', 'rel');
// 				expect(json.items[2].content).to.only.have.keys('type');
// 				done();
// 			});
// 			it('should emit JSON and match content type (b5)', function (done) {
// 				var json,
// 					path = "test/fixture/image";
// 				json = page.getContents({"folder": path}, page.generateJson);
// 				expect(json).to.have.key('items');
// 				expect(json.items).to.be.an('array');
// 				expect(json.items).to.have.length(3);
// 				expect(json.items[0].name).to.be('g3');
// 				expect(json.items[1].name).to.be('j1');
// 				expect(json.items[2].name).to.be('p2');
// 				expect(json.items[0].ext).to.be('.gif');
// 				expect(json.items[1].ext).to.be('.jpeg');
// 				expect(json.items[2].ext).to.be('.png');
// 				expect(json.items[0].content.type).to.be('image');
// 				expect(json.items[1].content.type).to.be('image');
// 				expect(json.items[2].content.type).to.be('image');
// 				done();
// 			});
// 		});
// 	});
// });
