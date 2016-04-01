/*
 Copyright [2016] [Relevance Lab]

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

var tags = require('_pr/model/tags/tags.js');
var AWSProvider = require('_pr/model/classes/masters/cloudprovider/awsCloudProvider');

const errorType = 'provider';

var providerService = module.exports = {};

providerService.checkIfProviderExists = function checkIfProviderExists(providerId, callback) {
    AWSProvider.getAWSProviderById(providerId, function(err, provider) {
        if(err) {
            var err = new Error('Internal server error');
            err.status = 500;
            callback(err);
        } else if(!provider) {
            var err = new Error('Provider not found');
            err.status = 404;
            callback(err);
        } else {
            callback(null, provider);
        }
    });
};

providerService.getTagsForProvider = function getTagsForProvider(provider, callback) {
    tags.getTagsByProviderId(provider._id, function(err, tags) {
        if(err) {
            var err = new Error('Internal server error');
            err.status = 500;
            callback(err);
        } else {
            callback(null, tags);
        }
    });
};

providerService.createTagsList = function createTagsList(tags, callback) {
    /*var tagsList = [];
    tags.forEach(function(tag) {
        delete tags.isDeleted;
        tagsList.push(tag);
    });*/

    callback(null, tags);
};

providerService.getTagsByNameForProvider = function getTagsByNameForProvider(provider, tagName, callback) {
    var parameters = {
        'providerId': provider._id,
        'tagName': tagName
    };
    tags.getTagByNameAndProviderId(parameters, function(err, tag) {
        if(err) {
            var err = new Error('Internal server error');
            err.status = 500;
            callback(err);
        } else if(!tag) {
            var err = new Error('Tag not found');
            err.status = 404;
            callback(err);
        }else {
            callback(null, tag);
        }
    });
};
