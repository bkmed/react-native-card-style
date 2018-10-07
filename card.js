import React, { Component } from 'react';
import { Image, Dimensions,StyleSheet ,TouchableHighlight,View,AsyncStorage,Alert,TouchableOpacity,ScrollView,TouchableWithoutFeedback,ImageBackground,Platform} from "react-native";
import { TabNavigator, StackNavigator,NavigationActions } from 'react-navigation';
import {Container, Header, Title, Content, Button, Card, CardItem, Thumbnail, Left, Right, Body, Item, Input, Spinner, Text,Separator, Toast} from "native-base";
import Icon   from 'react-native-vector-icons/MaterialIcons'
import {Dimens,couleurs,WelcolColor,Tabs} from "../color/Ressources";
import { Grid, Col,Row } from "react-native-easy-grid";
import Swipeable from 'react-native-swipeable';
import * as Progress from 'react-native-progress';
import Flag from 'react-native-flags';
import StarRating from 'react-native-star-rating';
import Language from "../components/language";
import styles from '../styles';
import { strings } from '../locales/i18n';
import LinearGradient from 'react-native-linear-gradient';
import * as FavorisActions from '../_services/actions/favoris';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

 class Card extends Component {
	  static propTypes = {
	      skill: React.PropTypes.object.isRequired,
	      onScheduleVideo: React.PropTypes.func,
	      onIncolNow: React.PropTypes.func,
	      onShare: React.PropTypes.func,
	      onEditClick: React.PropTypes.func,
	      onDeleteClick: React.PropTypes.func,
	      onCardClick: React.PropTypes.func,
	      userId: React.PropTypes.number,
	      userIdD: React.PropTypes.string,
	  }
    constructor(props) {
    super(props);

     this.state = {
          favorite: false, 
        };  
    }

    componentDidMount(){
       
    }

  

	renderTags(skill) {
        
      if(skill.tags) 
        { 
            return (TAGLIst = skill.tags.map( (tag , index) => 
                        
                        <View key = {tag.id} >
                               
                                <Text numberOfLines={2} multiline style={{
                          									  height: 16,
                          									  fontFamily: 'Roboto',
                          									  fontSize: 14,
                          									  fontWeight: 'normal',
                          									  fontStyle: 'normal',
                          									  textAlign: 'left',
                          									  color: '#afbec5',}}> {index <= 1 ? '#' + tag.label : null}</Text>
                        </View>
                        
                    ));
        } 
      else return (null);
    }

renderConnected(online)
	{
	  if(online == 1)
	  {
	    return <View style={styles.renderViewConnected}/>
	  }else
	  {
	    return <View style={styles.renderViewNotConnected}/>
	  }
	}

renderProgress(item) {
		if (item && item.user && item.user.call_rate)   {
       var rate = parseInt(item.user.call_rate.value.toFixed(2)) ;
       var avis = rate / parseInt(item.user.nb_rates);
       var avisF = avis.toFixed(2)
       var avisFianl = parseInt(avisF);
        return <StarRating
                disabled={true}
                maxStars={5}
                rating={avisFianl}
				        emptyStar={require('../images/rateE.png')}
				        emptyStarColor={"ff8200"}
				        halfStar={require('../images/rateH.png')}
				        halfStarColor={"ff8200"}
				        fullStar={require('../images/rateP.png')}
				        fullStarColor={"ff8200"}
				        starSize={12}
				        starStyle={{marginLeft:1}}
				        containerStyle={{marginLeft:-20 , marginTop:-14}}/>
		  
		  }
		  else {
		    return <StarRating
				        disabled={true}
				        maxStars={5}
				        rating={0}
				        emptyStar={require('../images/rateE.png')}
				        emptyStarColor={"ff8200"}
				        halfStar={require('../images/rateH.png')}
				        halfStarColor={"ff8200"}
				        fullStar={require('../images/rateP.png')}
				        fullStarColor={"ff8200"}
				        starSize={12}
				        starStyle={{marginLeft:1}}
				        containerStyle={{marginLeft:-20 , marginTop:-14}}/>
		  }
	}
	rendernoteMaitrise(item) {
			  if (item && item.user && item.user.call_rate ) {
          var rate = parseInt(item.user.call_rate.value) ;
          var avis = rate / parseInt(item.user.nb_rates);
          if(Number.isInteger(avis))
           var aviss = Math.round(avis)
          else
           var aviss = avis.toFixed(1)
			    return <Text note style={{marginLeft:5,
			    						  marginTop:-14,
			    						  width: 76,
										  height: 14,
										  fontFamily: 'Roboto',
										  fontSize: 8,
										  fontWeight: 'normal',
										  fontStyle: 'normal',
										  textAlign: 'left',
										  color: '#676767',
			    						}}>
			    				 {aviss}/5 • {item.user.nb_rates} {strings('detail-skill.commentaire')}
			    	   </Text> 
			  }
			  else {
			    return <Text note style={{marginLeft:5,
			    						  marginTop:-14,
			    						  width: 76,
										  height: 14,
										  fontFamily: 'Roboto',
										  fontSize: 8,
										  fontWeight: 'normal',
										  fontStyle: 'normal',
										  textAlign: 'left',
										  color: '#676767',
			    						}}>0/5</Text>
			  }
		}
renderLogo(image)
{
    if (image)
      {
        return ( <Thumbnail  small rounded  source={{uri:image}}></Thumbnail>)
      } 
    else
      {
        return ( <Thumbnail  small rounded  source={require('../images/default_avatar.jpg')}></Thumbnail>)
      } 
}	
renderTitle(titre)
{
  if(titre && titre.length <= 29)
    return  <Text uppercase style={styles.titleSkill}>{titre}</Text>
  else if(titre && titre.length > 29)
    return    <View>
                <Text uppercase style={styles.titleSkill}>{titre.substr(0,29)}.. </Text>
              </View>
  else
    return null
}

renderHonoraire(item)
{
  if(honoraire && honoraire.toString().length < 2)
    return  <View  style={styles.viewHonoraireSkill}>
                 <Text style={styles.textHonoraireSkill}>{honoraire+" €"}</Text>
            </View>
  else if(honoraire && honoraire.toString().length == 2)
    return  <View  style={styles.viewHonoraireSkill}>
                 <Text style={styles.textHonoraireSkill3}>{honoraire+" €"}</Text>
            </View>
  else if(honoraire && honoraire.toString().length > 2)
    return  <View  style={styles.viewHonoraireSkill}>
                 <Text style={styles.textHonoraireSkill2}>{honoraire+" €"}</Text>
            </View>
  else
    return null
}
  render = () => {
    const { onCardClick, onIncolNow, onScheduleVideo, skill , onShare , userId , userIdD, onEditClick , onDeleteClick} = this.props;
    if(skill && skill.user.user.is_provider == true && skill.user.user.id == userId)
    {return (
    	         
                    <View style={{zIndex: 0}} >
    		              	<Card  style={{zIndex:9,marginLeft:20,marginRight:20}}>
    		              		<TouchableOpacity onPress={onCardClick}>
                            <View style={{flex:1}}>
    		              	      {
                                skill.image  ?
   
                                      <Image  style={styles.imageSkill}
                                            source={{uri : imageCenter}} >
                                        <LinearGradient start={{x: 0.5, y: 1.0}} end={{x: 0.5, y: 0.0}} colors={[ 'rgba(0, 0, 0, 0.65)', 'rgba(1, 1, 1, 0)']} 
                                                style={styles.linearSkill} >
                                          {this.renderTitle(title)}
                                        </LinearGradient>
                                        {this.renderHonoraire(honoraire)}
                                      </Image>
        
                                         :
                                      <Image  style={styles.imageSkill}
                                            source={require('../images/skill.jpg')} >
                                        <LinearGradient start={{x: 0.5, y: 1.0}} end={{x: 0.5, y: 0.0}} colors={[ 'rgba(0, 0, 0, 0.65)', 'rgba(1, 1, 1, 0)']} 
                                                style={styles.linearSkill} >
                                          {this.renderTitle(title)}
                                        </LinearGradient>
                                        {this.renderHonoraire(honoraire)}
                                      </Image>
       
                              }
                            </View>
    		              			<View style={styles.bottomCardSkill}>
    		              				<Grid>
    		              				    <Col>{this.renderLogo(image)}</Col>
    		              				    <Col>{this.renderConnected(online)}</Col>
    			              				<Col size={40}>
                                     <Row>
                                          <Text style={styles.renderNomDetail}note>{username}</Text>
                                      </Row>
                                      <Row style={styles.renderprogressFeed}>{this.renderProgress(progress)}
                                      {this.rendernoteMaitrise(note)}</Row>
    			              				</Col>
                                <Col size={3}> 
                                    <View style={{alignSelf:'flex-end',marginRight:10}}>
                                       { this.state.favorite ? 
                                        <Icon size={24} name="favorite" color='#e40046' onPress={() => {}}  style={styles.flagstyle}> </Icon>
                                        :
                                        <Icon size={24} name="favorite-border" color='#3f3f3f' onPress={() => {}}  style={styles.flagstyle}> </Icon>
                                       }
                                    </View>
                                </Col>
    		              				</Grid>
    									
    		              			</View>
    		              			
    		              			<View style={{marginLeft:5,marginTop:20,marginBottom:20,flexDirection : 'row'}}>
    									         {this.renderTags(tag)}
    		              			</View>
    		              			<View style={{alignSelf:'flex-start',marginRight:10,flexDirection : 'row'}}>
                                                {languages ?
                                                  languages.map(lan =>  
                                                  <View style={styles.flagviewDetail2} key = {lan.language.code_iso} >
                                                          <Flag  code={lan.language.code_iso}  style={styles.flagstyleDetail}/>
                                                  </View>)
                                                  : null
                                                }
                            </View>
    		              			<View>
    		              				<Grid>
    			              				<Col ><Row style={styles.renderprogressFeed2}>{this.renderProgress(skill)}
                                                {this.rendernoteMaitrise(skill)}</Row></Col>
                                <Col size={3}>
                                  <View style={{alignSelf:'flex-end',marginRight:10}}>
                                    <Icon size={24} name="share" color='#3f3f3f' onPress={onShare} style={styles.flagstyle}> </Icon>
                                  </View>
    			              				</Col>
    		              				</Grid>
    		              			</View>
    		              		</TouchableOpacity>
    		              </Card>
    		            </View>
                    
    
        );}
else if(skill)
    {return (
                
                    <View style={{zIndex: 0}} >
                       <Card  style={{zIndex:9,marginLeft:20,marginRight:20}}>
                                <TouchableOpacity onPress={onCardClick}>
                                  <View style={{flex:1}}>
                                   {
                                      skill.image  ?
   
                                      <Image  style={styles.imageSkill}
                                            source={{uri : "https://api.welcol.io/uploads/img/skill/" + skill.image.id + "." + skill.image.url}} >
                                        <LinearGradient start={{x: 0.5, y: 1.0}} end={{x: 0.5, y: 0.0}} colors={[ 'rgba(0, 0, 0, 0.65)', 'rgba(1, 1, 1, 0)']} 
                                                style={styles.linearSkill} >
                                          {this.renderTitle(skill)}
                                        </LinearGradient>
                                        {this.renderHonoraire(skill)}
                                      </Image>
        
                                   :
                                      <Image  style={styles.imageSkill}
                                              source={require('../images/skill.jpg')} >   
                                        <LinearGradient start={{x: 0.5, y: 1.0}} end={{x: 0.5, y: 0.0}} colors={[ 'rgba(0, 0, 0, 0.65)', 'rgba(1, 1, 1, 0)']} 
                                                style={styles.linearSkill} >
                                          {this.renderTitle(skill)}
                                        </LinearGradient>
                                        {this.renderHonoraire(skill)}
                                      </Image>
                                    }
                                  </View>
                                    <View style={styles.bottomCardSkill}>
                                        <Grid>
                                            <Col>{this.renderLogo(skill)}</Col>
                                            <Col>{this.renderConnected(skill.user.online)}</Col>
                                            <Col size={40}>
                                                <Row>
                                                     <Text style={styles.renderNomDetail}note>{skill.user.nom+" "+skill.user.prenom}</Text>
                                                </Row>
                                                <Row style={styles.renderprogressFeed}>{this.renderProgress(skill)}</Row>
                                            </Col>
                                            <Col size={3}> 
                                                <View style={{alignSelf:'flex-end',marginRight:10}}>
                                                  { this.state.favorite ? 
                                                    <Icon size={24} name="favorite" color='#e40046' onPress={() => {this.removeFavoris(skill.id)}}  style={styles.flagstyle}> </Icon>
                                                    :
                                                    <Icon size={24} name="favorite-border" color='#3f3f3f' onPress={() => {this.addFavoris(skill.id)}}  style={styles.flagstyle}> </Icon>
                                                  }
                                                </View>
                                            </Col>
                                        </Grid>
                                        
                                    </View>
                                    
                                    <View style={{marginLeft:5,marginTop:10,marginBottom:10,flexDirection : 'row'}}>
                                        {this.renderTags(skill)}
                                    </View>
                                    <View style={{alignSelf:'flex-start',marginRight:10,flexDirection : 'row'}}>
                                                {skill.user.user_languages ?
                                                  skill.user.user_languages.map(lan =>  
                                                  <View style={styles.flagviewDetail2} key = {lan.language.code_iso} >
                                                          <Flag  code={lan.language.code_iso}  style={styles.flagstyleDetail}/>
                                                  </View>)
                                                  : null
                                                }
                                    </View>
                                    <View>
                                        <Grid>
                                            <Col ><Row style={styles.renderprogressFeed2}>{this.renderProgress(skill)}
                                                {this.rendernoteMaitrise(skill)}</Row></Col>
                                            <Col size={3}>
                                                <View style={{alignSelf:'flex-end',marginRight:10}}>
                                                  <Icon size={24} name="share" color='#3f3f3f' onPress={onShare} style={styles.flagstyle}> </Icon>
                                                </View>
                                            </Col>
                                        </Grid>
                                    </View>
                                </TouchableOpacity>
                              { skill && skill.user.user.id != userIdD ?
                                <View>  
                                    <View style={{marginLeft:5,marginTop:10,marginBottom:20,flexDirection : 'row'}}></View> 
                                    <Grid>
                                        <Col style={styles.footerViewDetail2}>
                                         <TouchableOpacity block style={styles.footerDetail2}   onPress={onIncolNow} >
                                               <Text ><Icon size={20} name="call" color={couleurs.White} /></Text >
                                               <Text style={styles.barBottomDetail6}> {strings('notifications.immediate')} </Text>
                                         </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                  </View>
                                  : null
                              } 
                          </Card>
                        </View>
                   
    
        );}
	else
		return null;
  }
}

export default Card;
