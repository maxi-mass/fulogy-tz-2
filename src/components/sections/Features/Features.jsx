import React from "react";
import styles from "./Features.module.css";
import Button from "../../common/Button/Button";

const Features = props => {
  return (
    <div className={styles.features}>
      <div className={styles.features__left}>
        <div className={styles.features__left_inner}>
          <div className={styles.features__left_inner__header}>СТОИМОСТЬ</div>
          <div className={styles.features__left_inner__desc}>
            Стоимость погонного метра светильника fulogy от <br />
            <span>2000</span> руб.
          </div>
          <div className={styles.features__left_inner__label}>
            В цену входит:
          </div>
          <Button>Заказать звонок</Button>
          <div className={styles.features__left_inner__phone}>
            или звоните по телефону:
            <br />
            <span>+7-(800)-505-65-33</span>
          </div>
          <div className={styles.features__left_inner__social}>
            <div>
              <img src="/static/images/whatsapp.svg" alt="" />
            </div>
            <div>
              <img src="/static/images/viber.svg" alt="" />
            </div>
            <div>
              <img src="/static/images/telega.svg" alt="" />
            </div>
          </div>
          <div className={styles.features__left_inner__arrow}></div>
        </div>
        <div className={styles.features__left__quotes}></div>
      </div>
      <div className={styles.features__right}>
        <div className={styles.features__right_inner}>
          <table>
            <tr>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>01</div>
                  <div>
                    Блок питания <br /> (не свистит, <br /> не жужжит);
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>02</div>
                  <div>
                    Индивидуальное <br /> производство <br /> для Вашей кухни;
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>03</div>
                  <div>
                    Сенсор управления <br /> светом очень удобный, <br />
                    технологичный и стильный;
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>04</div>
                  <div>Гарантия 5 лет;</div>
                </div>
              </td>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>05</div>
                  <div>
                    Демонтаж старых <br /> светильников и <br /> монтаж наших;
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.features__right_inner__feature}>
                  <div className={styles.feature_number}>06</div>
                  <div>
                    Светодиоды высокой <br /> цветопередачи, что делает <br />
                    свет приближенным к <br /> естественому солнечному цвету.
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Features;
