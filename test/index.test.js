const Client = require('../client')
const {
    should,
    expect,
    assert
} = require('chai');
describe('#Service', () => {
    describe('#Test1', () => {
        it('should return ok', (done) => {
            Client.Echo({message: 'Zhangsan'}, function(err, ret) {
                try {
                    expect(err).to.equal(null)
                    expect(ret).to.not.equal(null)
                    expect(ret.message).to.be.a('string').to.equal('Hello Zhangsan')
                    done()
                } catch(err) {
                    done(err)
                }
                
            })
        });
    })
})