function checktir() {
	/** Check du vaisseau 1 **/
	if ((lastx == vaisseau_x) && (lasty == vaisseau_y)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+34)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+0) && (lasty == vaisseau_y+68)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
	case_touche = true;
	}
	else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
	case_touche = true;
	}
	/** Check du tank1 **/
	else if ((lastx == tank1_x) && (lasty == tank1_y)) {
	case_touche = true;
	}
	else if ((lastx == tank1_x+34) && (lasty == tank1_y)) {
	case_touche = true;
	}
	else if ((lastx == tank1_x) && (lasty == tank1_y+34)) {
	case_touche = true;
	}
	else if ((lastx == tank1_x+34) && (lasty == tank1_y+34)) {
	case_touche = true;
	}
	/** Check du tank2 **/
	else if ((lastx == tank2_x) && (lasty == tank2_y)) {
	case_touche = true;
	}
	else if ((lastx == tank2_x+34) && (lasty == tank2_y)) {
	case_touche = true;
	}
	else if ((lastx == tank2_x) && (lasty == tank2_y+34)) {
	case_touche = true;
	}
	else if ((lastx == tank2_x+34) && (lasty == tank2_y+34)) {
	case_touche = true;
	}
	else if ((lastx == unite1_x) && (lasty == unite1_y)) {
	case_touche = true;
	}
	else if ((lastx == unite2_x) && (lasty == unite2_y)) {
	case_touche = true;
	}
	else if ((lastx == unite3_x) && (lasty == unite3_y)) {
	case_touche = true;
	}
	else {
	case_touche = false;
	}
}

function checkia() {
	/** Check du vaisseau 1 **/
	if ((lastx == vaisseau_ia_x) && (lasty == vaisseau_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x) && (lasty == vaisseau_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+0) && (lasty == vaisseau_ia_y+68)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y+68)) {
	ia_touche = true;
	}
	else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y+68)) {
	ia_touche = true;
	}
	/** Check du tank1 **/
	else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
	ia_touche = true;
	}
	/** Check du tank2 **/
	else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y+34)) {
	ia_touche = true;
	}
	else if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
	ia_touche = true;
	}
	else if ((lastx == unite3_ia_x) && (lasty == unite3_ia_y)) {
	ia_touche = true;
	}
	else {
	ia_touche = false;
	}
}

/** check avec bonus **/
function checkbonus() {
	if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
	bonus_touche = true;
	}
	else if ((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
	bonus_touche = true;
	}
}

