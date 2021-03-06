import { expect } from 'chai';
import validator from '../../lib';

describe('Integer validator', () => {
  const rules = {
    count: ['integer']
  };

  context('with nil value', () => {
    it('should success', () => {
      const result = validator.validate(rules, {count: null});
      const err = result.messages;

      expect(result.success).to.equal(true);
      expect(err).to.not.have.property('count');
    });
  });

  context('with empty value', () => {
    it('should fail', () => {
      const result = validator.validate(rules, {count: ''});
      const err = result.messages;

      expect(result.success).to.equal(false);
      expect(err).have.property('count');
    });
  });

  context('with invalid number', () => {
    it('should fail', () => {
      const result = validator.validate(rules, {count: '123a'});
      const err = result.messages;

      expect(result.success).to.equal(false);
      expect(err).to.have.property('count');
      expect(err.count.integer).to.equal('Count must be an integer.');
    });
  });

  context('with integer', () => {
    it('should success', () => {
      const result = validator.validate(rules, {count: 123});
      const err = result.messages;

      expect(result.success).to.equal(true);
      expect(err).to.not.have.property('count');
    });
  });

  context('with negative integer', () => {
    it('should success', () => {
      const result = validator.validate(rules, {count: -123});
      const err = result.messages;

      expect(result.success).to.equal(true);
      expect(err).to.not.have.property('count');
    });
  });
  
  context('with integer presented with string', () => {
    it('should success', () => {
      const result = validator.validate(rules, {count: '123'});
      const err = result.messages;

      expect(result.success).to.equal(true);
      expect(err).to.not.have.property('count');
    });
  });

  context('with negative integer presented with string', () => {
    it('should success', () => {
      const result = validator.validate(rules, {count: '-123'});
      const err = result.messages;

      expect(result.success).to.equal(true);
      expect(err).to.not.have.property('count');
    });
  });

  context('with floating number', () => {
    it('should fail', () => {
      const result = validator.validate(rules, {count: 123.40});
      const err = result.messages;

      expect(result.success).to.equal(false);
      expect(err).have.property('count');
    });
  });

  context('with floating number presented with string', () => {
    it('should fail', () => {
      const result = validator.validate(rules, {count: '123.40'});
      const err = result.messages;

      expect(result.success).to.equal(false);
      expect(err).have.property('count');
    });
  });
});

