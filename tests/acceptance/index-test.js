import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('creating comment without explicit post', async function(assert) {
    assert.equal(server.db.posts.length, 0, 'precondition - no posts');
    assert.equal(server.db.comments.length, 0, 'precondition - no comments');

    let comment = this.server.create('comment');
    assert.ok(!!comment, 'comment');
    assert.ok(!!comment.post,'comment.post');

    assert.equal(server.db.comments.length, 1, 'created comment');
    assert.equal(server.db.posts.length, 1, 'created associated post');
  });

  test('creating comment with explicit post', async function(assert) {
    assert.equal(server.db.posts.length, 0, 'precondition - no posts');
    assert.equal(server.db.comments.length, 0, 'precondition - no comments');

    let post = this.server.create('post');
    let comment = this.server.create('comment', { post });
    assert.ok(!!comment, 'comment');
    assert.ok(!!comment.post,'comment.post');
    assert.equal(comment.post.id, post.id, 'comment has the correct post');

    assert.equal(server.db.comments.length, 1, 'created comment');
    assert.equal(server.db.posts.length, 1, 'only 1 post created'); // fails. expected: 1, actual: 2
  });

  test('creating comment with explicit postId', async function(assert) {
    assert.equal(server.db.posts.length, 0, 'precondition - no posts');
    assert.equal(server.db.comments.length, 0, 'precondition - no comments');

    let post = this.server.create('post');
    let comment = this.server.create('comment', { postId: post.id });
    assert.ok(!!comment, 'comment');
    assert.ok(!!comment.post,'comment.post');
    assert.equal(comment.post.id, post.id, 'comment has the correct post');

    assert.equal(server.db.comments.length, 1, 'created comment');
    assert.equal(server.db.posts.length, 1, 'only 1 post created'); // fails. expected: 1, actual: 2
  });

});
