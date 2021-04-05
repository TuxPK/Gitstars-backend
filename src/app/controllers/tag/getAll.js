import Tag from '../../models/Tag';

export default async (req, res) => {
  const { user_id } = req;

  const tags = await Tag.findAll({
    where: {
      user_id,
    },
  });

  res.json(tags);
};
