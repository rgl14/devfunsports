import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AnalysisFormatService {

  constructor() { }

  analysisFormat(analysisData,userId) {
    var sportDataFormat = {};
    _.forEach(analysisData, (item, index) => {
      var eventListFormat = {};
      _.forEach(item.eventList, (item2, index2) => {
        item2['sportBfId'] = item.bfId;
        item2['sportName'] = item.name;
        item2['sportId'] = item.id;
        if(item2._admReport[userId]!=undefined){
          if (item2._admReport[userId].moBetdata || item2._admReport[userId].fancyBetdata || item2._admReport[userId].bmBookData) {
            item2['isBets'] = true;
          }
          else {
            item2['isBets'] = false;
          }
          var matchDateTime = item2.eventDate.split('-')[2].split(' ')[0];
          var currentDateTime = item2._admReport[userId].currentTime.split('-')[2].split(' ')[0];
          var day = parseInt(matchDateTime) - parseInt(currentDateTime);
        }else {
          item2['isBets'] = false;
        }
        
        item2['upcomming'] = 0;

        
        // console.log(day)

        if (item2.isInplay == 0 && day == 0) {
          item2['upcomming'] = day;
        }
        if (item2.isInplay == 0 && day == 1) {
          item2['upcomming'] = day;
        }
        if(item2._admReport[userId]!=undefined){
          var MatchBookdata=item2._admReport[userId].bookData;
        }
        _.forEach(item2.mktList, (item3, index3) => {
          if (item3.name == "Match Odds") {
            let latestIndex = 0;
            let runnerData = [];
            _.forEach(item3.runnerData, (item4, index4) => {
              runnerData.push(item4);
              if (latestIndex == 0) {
                item2['runnerName1'] = item4.runnerName;
                item2['runner1Back'] = item4.back1;
                item2['runner1Lay'] = item4.lay1;
                if(MatchBookdata==undefined){
                  item2['runner1Book']=0
                }else{
                  item2['runner1Book']=MatchBookdata.runner1Book
                }
              }
              if (latestIndex == 1) {
                item2['runnerName2'] = item4.runnerName;
                item2['runner2Back'] = item4.back1;
                item2['runner2Lay'] = item4.lay1;
                if(MatchBookdata==undefined){
                  item2['runner2Book']=0;
                }else{
                  item2['runner2Book']=MatchBookdata.runner2Book;
                }
              }
              if (latestIndex == 2) {
                item2['runnerName3'] = item4.runnerName;
                item2['runner3Back'] = item4.back1;
                item2['runner3Lay'] = item4.lay1;
                if(MatchBookdata==undefined){
                  item2['runner3Book']=0;
                }else{
                  item2['runner3Book']=MatchBookdata.runner3Book;
                }
              }
              latestIndex++;
            });
            item3.runnerData = runnerData;
          }
          else {
            let runnerData = [];
            _.forEach(item3.runnerData, (item4, index4) => {
              runnerData.push(item4);
            });
            item3.runnerData = runnerData;
          }

        });

        eventListFormat[item2.bfId] = item2;
      });
      sportDataFormat[item.bfId] = {
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        eventList: eventListFormat
      };
    });
    return sportDataFormat;
  }

  allMatchdateWiseFormat(analysisData){
    let AllmatchList=[];
    _.forEach(analysisData, (item, index) => {
      _.forEach(item.eventList, (item2, index2) => {
          AllmatchList.push(item2)
      })
    })
    AllmatchList.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return <any>new Date(a.eventDate)-<any>new Date(b.eventDate);
    });
    return AllmatchList;
  }

  allMachDataListFormat(allmatchlistdata){
    var displaymatchlistdata=[];
    allmatchlistdata.forEach(match => {
      if(match.sportBfId=="4"){
        displaymatchlistdata.push(match)
      }
    });
    allmatchlistdata.forEach(match => {
      if(match.sportBfId=="2"){
        displaymatchlistdata.push(match)
      }
    });
    allmatchlistdata.forEach(match => {
      if(match.sportBfId=="1"){
        displaymatchlistdata.push(match)
      }
    });
    return displaymatchlistdata;
  }

  eventsWise(eventsList) {
    let eventsListData = [];

    _.forEach(eventsList, (item, index) => {
      eventsListData.push(item);
    });

    return eventsListData;
  }

  inplayWise(analysisData, tab) {
    let inplayData = [];

    _.forEach(analysisData, (item, index) => {
      let eventsListData = [];
      _.forEach(item.eventList, (item2, index2) => {
        if (tab == 1 && item2.isInplay == 1) {
          eventsListData.push(item2);
        }
        if (tab == 2 && item2.isInplay == 0 && item2.upcomming == 0) {
          eventsListData.push(item2);
        }
        if (tab == 3 && item2.isInplay == 0 && item2.upcomming == 1) {
          eventsListData.push(item2);
        }
      });
      inplayData.push({
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        eventList: eventsListData
      });
    });

    return inplayData.reverse();
  }

  myMarketsWise(analysisData) {
    let inplayData = [];

    _.forEach(analysisData, (item, index) => {
      let eventsListData = [];
      _.forEach(item.eventList, (item2, index2) => {

        if (item2.isBets) {
          eventsListData.push(item2);
        }

      });
      inplayData.push({
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        eventList: eventsListData
      });
    });

    return inplayData;
  }

  fancyBetWise(fancyBetdata) {

    let fancyBets = [];
    _.forEach(fancyBetdata, (item, index) => {
      _.forEach(item, (item2, index2) => {
        fancyBets.push(item2);
      })
    })

    return fancyBets;
  }

  favMatchWise(analysisData) {

    let favData = [];

    let favArray = localStorage.getItem('favourite');
    if (favArray != null) {
      favArray = JSON.parse(favArray);
      // console.log(favArray);
      _.forEach(analysisData, (item, index) => {
        // let eventsListData = [];
        _.forEach(item.eventList, (item2, index2) => {
          let matchIndex = _.indexOf(favArray, item2.bfId);
          // console.log(matchIndex, item2.bfId);
          if (matchIndex > -1) {
            // eventsListData.push(item2);
            favData.push(item2);
          }
        });
        // favData.push({
        //   bfId: item.bfId,
        //   id: item.id,
        //   name: item.name,
        //   eventList: eventsListData
        // });
      });
    }

    return favData.reverse();

  }

}
