'use strict';

let treeWalker = require(fromRoot('app/lib/tree-walker'));

describe('treeWalker', () => {

    let treeFromRoot, treeFromChild;

    beforeEach(syncSpec(() => {

        const componentsToConsumeRootPath = fromRoot('example/components');

        treeFromRoot = treeWalker(componentsToConsumeRootPath, ['.md']).walk();
        treeFromChild = treeWalker(componentsToConsumeRootPath, ['.md']).walk('nested/child');

    }));

    it('should have a parent directory equal to self when at root', syncSpec(() => {
        expect(treeFromRoot.parent).to.equal('/');
    }));

    //it('should have a parent directory equal to one level up when not at root', syncSpec(() => {
    //    expect(treeFromChild.parent).to.equal('/nested');
    //}));

    it('should have a path equal to root', syncSpec(() => {
        expect(treeFromRoot.path).to.equal('/');
    }));

    //it('should have a path equal to location of component', syncSpec(() => {
    //    expect(treeFromChild.path).to.equal('/nested/child');
    //}));

    it('should have a name corresponding to root of walked directory', syncSpec(() => {
        expect(treeFromRoot.name).to.equal('components');
    }));

    //it('should have a name corresponding to name of component', syncSpec(() => {
    //    expect(treeFromChild.name).to.equal('child');
    //}));

    it('should have a list of children', syncSpec(() => {
        expect(treeFromRoot.children).to.have.length(5);
    }));

    describe('child', () => {

        let childItem;

        beforeEach(syncSpec(() => {
            childItem = treeFromRoot.children[1];
        }));

        it('should have a parent', syncSpec(() => {
            expect(childItem.parent).to.equal('/');
        }));

        it('should have a path', syncSpec(() => {
            expect(childItem.path).to.equal('/nested');
        }));

        it('should have a name', syncSpec(() => {
            expect(childItem.name).to.equal('nested');
        }));

        it('should not have children', syncSpec(() => {
            expect(childItem.children).to.have.length(1);
        }));

        it('should set isModule to false if no readme found', syncSpec(() => {
            expect(childItem.isModule).to.be.false();
        }));
    });

    describe('nested child', () => {

        let childItem;

        beforeEach(syncSpec(() => {
            childItem = treeFromRoot.children[1].children[0];
        }));

        it('should have a parent', syncSpec(() => {
            expect(childItem.parent).to.equal('/nested');
        }));

        it('should have a path', syncSpec(() => {
            expect(childItem.path).to.equal('/nested/child');
        }));

        it('should have a name', syncSpec(() => {
            expect(childItem.name).to.equal('child');
        }));

        it('should not have children', syncSpec(() => {
            expect(childItem.children).to.be.undefined();
        }));

        it('should set isModule to true when directory contains readme', syncSpec(() => {
            expect(childItem.isModule).to.be.true();
        }));

    });

});