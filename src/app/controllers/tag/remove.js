import Tag from '../../models/Tag';

export default async (req, res) => {
  const { uuid } = req.params;

  await Tag.destroy({
    where: {
      uuid,
    },
  });

  res.json({ message: 'Tag successfully deleted.' });
};
