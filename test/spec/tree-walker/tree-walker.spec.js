'use strict';

let treeWalker = require(fromRoot('app/lib/tree-walker'));

describe('treeWalker', () => {

    let treeFromRoot, treeFromChild, treeFromFile;

    beforeEach(syncSpec(() => {

        let componentsToConsumeRootPath = fromRoot('example/components');

        treeFromRoot  = treeWalker(componentsToConsumeRootPath).walk();
        treeFromChild = treeWalker(componentsToConsumeRootPath).walk('page-furniture/footer');
        treeFromFile  = treeWalker(componentsToConsumeRootPath).walk('page-furniture/footer/footer.hbs');
    }));

    it('should have a parent directory equal to self when at root', syncSpec(() => {
        expect(treeFromRoot.parent).to.equal('/components');
    }));

    it('should have a parent directory equal to one level up when not at root', syncSpec(() => {
        expect(treeFromChild.parent).to.equal('/components/page-furniture');
    }));

    it('should have a name corresponding to root of walked directory', syncSpec(() => {
        expect(treeFromRoot.name).to.equal('components');
    }));

    it('should have a list of items', syncSpec(() => {
        expect(treeFromRoot.items.length).to.equal(4);
    }));

    describe('item', () => {

        describe('directory', () => {

            let directoryItem;

            beforeEach(syncSpec(() => {
                directoryItem = treeFromRoot.items[0];
            }));

            it('should have a root', syncSpec(() => {
                expect(directoryItem.root).to.equal('/');
            }));

            it('should have a directory', syncSpec(() => {
                expect(directoryItem.dir).to.equal('/components');
            }));

            it('should have a base name', syncSpec(() => {
                expect(directoryItem.base).to.equal('button');
            }));

            it('should not have a file extension', syncSpec(() => {
                expect(directoryItem.ext).to.equal('');
            }));

            it('should have a uri', syncSpec(() => {
                expect(directoryItem.uri).to.equal('/components/button');
            }));
        });

        describe('file', () => {

            let fileItem;

            beforeEach(syncSpec(() => {
                fileItem = treeFromRoot.items[1];
            }));

            it('should have a root', syncSpec(() => {
                expect(fileItem.root).to.equal('/');
            }));

            it('should have a directory', syncSpec(() => {
                expect(fileItem.dir).to.equal('/components');
            }));

            it('should have a base name', syncSpec(() => {
                expect(fileItem.base).to.equal('example.hbs');
            }));

            it('should have a file extension', syncSpec(() => {
                expect(fileItem.ext).to.equal('.hbs');
            }));

            it('should have a uri', syncSpec(() => {
                expect(fileItem.uri).to.equal('/components/example.hbs');
            }));
        });
    });
});